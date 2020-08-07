from pydantic import BaseModel, constr, confloat
from typing import Optional, List


class GenerateRequest(BaseModel):
    prefix: constr(max_length=256)
    temperature: Optional[confloat(gt=0)] = 0.7


class GenerateResponse(BaseModel):
    motions: List[str]
