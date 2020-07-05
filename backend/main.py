from fastapi import FastAPI

def create_app():
    app = FastAPI(docs_url='/api/docs',
                  openapi_url="/api/openapi.json")

    app.include_router(
        motion.router,
        prefix="/api/motion",
    )

    return app

app = create_app()
