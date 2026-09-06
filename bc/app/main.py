from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.models import ChatRequest, ChatResponse, JobRecommendation, JobRecommendationRequest
from app.services.llm import generate_job_recommendation, generate_response


app = FastAPI(
    title="Experiential Labs AI Backend",
    version="1.0.0",
)


# React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "AI Backend is running"
    }


@app.get("/health")
async def health():
    return {
        "status": "ok"
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    try:

        answer = await generate_response(
            request.message
        )

        return ChatResponse(
            response=answer
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/api/job-recommendations", response_model=JobRecommendation)
async def job_recommendations(request: JobRecommendationRequest):
    """Return one parsed recommendation; clients call sequentially for progressive UI updates."""
    try:
        return await generate_job_recommendation(request)
    except (ValueError, KeyError) as error:
        raise HTTPException(status_code=502, detail=f"Could not parse the job recommendation: {error}") from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error
