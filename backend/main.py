from fastapi import FastAPI
from routers import generate


def create_app():
    app = FastAPI(docs_url='/api/docs',
                  openapi_url="/api/openapi.json")

    app.include_router(
        generate.router,
        prefix="/api/generate",
    )

    return app


app = create_app()
