import pandas as pd
from sklearn.preprocessing import LabelEncoder

USD_TO_INR = 90

df = pd.read_csv("data/Loan-Approval-Prediction.csv")

# Fill missing values
df["Gender"] = df["Gender"].fillna(df["Gender"].mode()[0])
df["Married"] = df["Married"].fillna(df["Married"].mode()[0])
df["Dependents"] = df["Dependents"].fillna(df["Dependents"].mode()[0])
df["Self_Employed"] = df["Self_Employed"].fillna(df["Self_Employed"].mode()[0])

df["LoanAmount"] = df["LoanAmount"].fillna(df["LoanAmount"].median())
df["Loan_Amount_Term"] = df["Loan_Amount_Term"].fillna(
    df["Loan_Amount_Term"].median()
)

df["Credit_History"] = df["Credit_History"].fillna(
    df["Credit_History"].mode()[0]
)


df["Dependents"] = df["Dependents"].replace("3+", 3)
df["Dependents"] = df["Dependents"].astype(int)

# Convert USD -> INR
df["ApplicantIncome"] *= USD_TO_INR
df["CoapplicantIncome"] *= USD_TO_INR
df["LoanAmount"] *= USD_TO_INR

# Remove ID column
df = df.drop("Loan_ID", axis=1)


categorical_cols = [
    "Gender",
    "Married",
    "Education",
    "Self_Employed",
    "Property_Area",
    "Loan_Status"
]

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])

# Save cleaned dataset
df.to_csv(
    "data/cleaned_dataset.csv",
    index=False
)

print("cleaned_dataset.csv saved successfully")