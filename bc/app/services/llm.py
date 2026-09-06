import httpx
import json
import re

from app.config import (
    EXPLABS_API_KEY,
    EXPLABS_BASE_URL,
    LLM_MODEL,
)
from app.models import JobRecommendation, JobRecommendationRequest


async def generate_response(message: str) -> str:

    url = f"{EXPLABS_BASE_URL}/chat/completions"

    headers = {
        "Authorization": f"Bearer {EXPLABS_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": LLM_MODEL,
        "messages": [
            {
                "role": "user",
                "content": message,
            }
        ],
    }

    async with httpx.AsyncClient(timeout=60.0) as client:

        response = await client.post(
            url,
            headers=headers,
            json=payload,
        )

        response.raise_for_status()

        data = response.json()

        return data["choices"][0]["message"]["content"]


def _json_from_model(content: str) -> dict:
    """Accept JSON returned directly or inside a Markdown code fence."""
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", content.strip(), flags=re.IGNORECASE)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        start, end = cleaned.find("{"), cleaned.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise ValueError("The model did not return a JSON job recommendation.")
        return json.loads(cleaned[start : end + 1])


async def generate_job_recommendation(request: JobRecommendationRequest) -> JobRecommendation:
    prompt = f'''Create exactly one realistic entry-level job recommendation for a student.
This is recommendation content, not a claim that a live vacancy exists. Do not invent a job URL.
Student skills: {", ".join(request.skills)}
Area of interest: {request.interest}
Specialization: {request.specialization or "Not specified"}
Career preference: {request.preference or "Either internship or full-time"}
Assessment score: {request.assessment_score if request.assessment_score is not None else "Not available"}
Recommendation position in the list: {request.index + 1}

Return JSON only, with this exact shape:
{{
  "id": "short-unique-slug",
  "title": "role title",
  "company": "representative employer or company type",
  "match": 0,
  "type": "Internship or Job",
  "location": "City · Work style",
  "posted": "AI recommendation",
  "description": "one short sentence",
  "why": "one short sentence tied to the supplied profile",
  "required": ["skill", "skill"],
  "matched": ["student skill"],
  "gaps": ["skill to build"],
  "applicants": "Typical entry-level role"
}}
Use a different role focus than earlier positions, stay grounded in the supplied skills, and give match as an integer from 55 to 95.'''
    content = await generate_response(prompt)
    job = JobRecommendation.model_validate(_json_from_model(content))
    # A model-generated id can collide across retries; make it deterministic per slot.
    return job.model_copy(update={"id": f"ai-{request.index}-{job.id}"})
