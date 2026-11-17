from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/health")
def health_check() -> dict[str, object]:
    return {
        "status": "ok",
        "service": "luna-safe-api",
        "version": "0.1.0",
        "pipeline": {
            "image_ingestion": "planned",
            "boulder_detection": "not_connected",
            "size_estimation": "not_connected",
            "hazard_mapping": "not_connected",
        },
    }
