from fastapi import APIRouter

from .models import GenerateRequest, GenerateResponse

router = APIRouter()

model = LanguageGenerationModel("gpt2", "./artifacts/model",
        args={"length": 256, 'fp16': False}, use_cuda=False)

@router.post("/", response_model=MotionResponse)
async def generate_motion(request: MotionRequest):
    prefix = request.prefix
    temperature = request.temperature

    model_input = [prefix] * 5

    results = model.generate(model_input, verbose=False, args={'temperature':0.9})

    return MotionResponse(motions=results)
