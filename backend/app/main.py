from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.core.config import APP_ENV, APP_NAME, FRONTEND_ORIGIN

app = FastAPI(
    title=APP_NAME,
    description=(
        "Research prototype for lunar boulder detection and terrain hazard "
        "assessment. The ML pipeline is not connected in this foundation release."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_ORIGIN,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["system"])
def root() -> dict[str, str]:
    return {
        "name": APP_NAME,
        "environment": APP_ENV,
        "docs": "/docs",
        "health": "/api/v1/health",
    }


app.include_router(health_router, prefix="/api/v1")
