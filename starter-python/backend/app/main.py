import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from pydantic import BaseModel

from app.loader import load_recipes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

RECIPES_DIR = os.environ.get("RECIPES_DIR", "data/recipes")


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.recipes = load_recipes(RECIPES_DIR)
    logger.info("Loaded %d recipe(s) from %s", len(app.state.recipes), RECIPES_DIR)
    yield


app = FastAPI(title="Spaceport bar starter", lifespan=lifespan)


class RecommendationRequest(BaseModel):
    need: str


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/recommendations")
def recommendations(request: RecommendationRequest) -> list:
    # TODO: implement matching
    return []
