import os
from dotenv import load_dotenv

load_dotenv()

EXPLABS_API_KEY = os.getenv("EXPLABS_API_KEY")
EXPLABS_BASE_URL = os.getenv(
    "EXPLABS_BASE_URL",
    "https://api.experientiallabs.ai/v1"
)

LLM_MODEL = os.getenv("LLM_MODEL", "fable-5")

if not EXPLABS_API_KEY:
    raise RuntimeError("EXPLABS_API_KEY is not configured")