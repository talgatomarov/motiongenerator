from fastapi import APIRouter
from simpletransformers.language_generation import LanguageGenerationModel


from .models import GenerateRequest, GenerateResponse

router = APIRouter()

model = LanguageGenerationModel("gpt2", "artifacts/model",
        args={"length": 256, 'fp16': False}, use_cuda=False)

@router.post("/", response_model=GenerateResponse)
async def generate_motion(request: GenerateRequest):
    prefix = request.prefix
    temperature = request.temperature

    results = model.generate(prefix, verbose=False,
            args={
                'temperature':temperature,
                'repetition_penalty': 2,
                'num_return_sequences': 5,
                'top_p': 0.95,
                'stop_token': '.'
                })

    return GenerateResponse(motions=results)
