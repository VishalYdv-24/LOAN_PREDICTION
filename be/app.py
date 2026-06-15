from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from math import pow
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("models/loan_model.pkl")
features = joblib.load("models/features.pkl")


class LoanRequest(BaseModel):
    Gender: int
    Married: int
    Dependents: int
    Education: int
    Self_Employed: int
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float
    Property_Area: int


@app.get("/")
def home():
    return {
        "message": "Loan Prediction API Working"
    }


@app.post("/predict")
def predict(data: LoanRequest):

    df = pd.DataFrame([data.model_dump()])
    df = df[features]

    prediction = model.predict(df)
    probability = model.predict_proba(df)

    approved = bool(prediction[0])

    approved_probability = round(
        float(probability[0][1]) * 100,
        2
    )

    rejected_probability = round(
        float(probability[0][0]) * 100,
        2
    )

    return {
        "approved": approved,
        "result": "Approved" if approved else "Rejected",
        "approved_probability": approved_probability,
        "rejected_probability": rejected_probability
    }

class EmiRequest(BaseModel):
    loan_amount : float
    interest_rate : float
    tenure_years :int
@app.post("/calculate-emi")
def calculate_emi(data: EmiRequest):

    P = data.loan_amount
    r = data.interest_rate / (12 * 100)
    n = data.tenure_years * 12

    emi = (
        P * r * (1 + r) ** n
    ) / (
        (1 + r) ** n - 1
    )

    total_payment = emi * n
    total_interest = total_payment - P

    return {
        "monthly_emi": round(emi, 2),
        "total_interest": round(total_interest, 2),
        "total_payment": round(total_payment, 2)
    }