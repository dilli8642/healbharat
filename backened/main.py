from fastapi import FastAPI
from pydantic import BaseModel
from ml.pressure_logic import calculate_epi
from ml.forecast_logic import forecast_arrivals
from ml.hotspot_logic import hotspot_score

app = FastAPI()

class InputData(BaseModel):
    pressure: float
    ambulances: int

@app.post("/predict-pressure")
def predict_pressure(data: InputData):

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
    return {"forecast": forecast_arrivals(data.ambulances)}
