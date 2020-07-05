from fastapi import APIRouter
from simpletransformers.language_generation import LanguageGenerationModel


from .models import GenerateRequest, GenerateResponse

router = APIRouter()

model = LanguageGenerationModel("gpt2", "./routers/generate/artifacts/model",
        args={"length": 256, 'fp16': False}, use_cuda=False)

@router.post("/", response_model=GenerateResponse)
async def generate_motion(request: GenerateRequest):
    prefix = request.prefix
    temperature = request.temperature

    results = []

    for _ in range(5):
        results += model.generate(prefix, verbose=False, args={'temperature':temperature})

    return GenerateResponse(motions=results)
