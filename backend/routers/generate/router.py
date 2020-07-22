from fastapi import APIRouter
from transformers import GPT2Tokenizer, GPT2LMHeadModel

from .models import GenerateRequest, GenerateResponse

router = APIRouter()

model = GPT2LMHeadModel.from_pretrained("artifacts/model")
tokenizer = GPT2Tokenizer.from_pretrained("artifacts/model")
stop_token = '<|endoftext|>'


@router.post("", response_model=GenerateResponse)
async def generate_motion(request: GenerateRequest):
    # Beginning of the motion
    prefix = request.prefix
    # High temperature results in more "unpredictible" results
    temperature = request.temperature

    inputs = tokenizer.encode(prefix, return_tensors="pt")
    outputs = model.generate(inputs, max_length=64, do_sample=True,
                             num_beams=1, top_p=0.99,
                             early_stopping=True, num_return_sequences=5,
                             temperature=temperature, repetition_penalty=5)

    results = []

    for output in outputs:
        text = tokenizer.decode(output)
        text = text[: text.find(stop_token) if stop_token else None]
        results.append(text)

    return GenerateResponse(motions=results)
