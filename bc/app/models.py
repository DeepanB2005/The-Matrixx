from typing import Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


class JobRecommendationRequest(BaseModel):
    skills: list[str] = Field(min_length=1)
    interest: str = Field(min_length=1)
    specialization: str | None = None
    preference: str | None = None
    assessment_score: int | None = Field(default=None, ge=0, le=100)
    index: int = Field(default=0, ge=0, le=9)


class JobRecommendation(BaseModel):
    id: str
    title: str
    company: str
    match: int = Field(ge=0, le=100)
    type: Literal["Internship", "Job"]
    location: str
    posted: str
    description: str
    why: str
    required: list[str]
    matched: list[str]
    gaps: list[str]
    applicants: str
