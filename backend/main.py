from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ml.pressure_logic import calculate_epi
from ml.forecast_logic import forecast_arrivals
from ml.hotspot_logic import hotspot_score


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputData(BaseModel):
    pressure: float
    ambulances: int


@app.post("/predict-pressure")
def predict_pressure(data: InputData):

    if data.pressure < 0 or data.ambulances < 0:
        return {"error": "Invalid input"}

    epi, alert = calculate_epi(data.pressure, data.ambulances)

    capacity = 20
    load_density = round(data.ambulances / capacity, 2)

    return {
        "epi": epi,
        "alert": alert,
        "load_density": load_density
    }


@app.post("/forecast")
def forecast(data: InputData):

    forecast_data = forecast_arrivals(data.ambulances)

    return {"forecast": forecast_data}
