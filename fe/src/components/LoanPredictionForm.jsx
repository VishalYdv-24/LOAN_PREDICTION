import { useState } from "react";
import axios from "axios";

function LoanPredictionForm() {
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    Gender: 1,
    Married: 1,
    Dependents: 0,
    Education: 0,
    Self_Employed: 0,
    ApplicantIncome: 500000,
    CoapplicantIncome: 0,
    LoanAmount: 1000000,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: 2,
  });

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-IN");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predictLoan = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", formData);

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Loan Approval Prediction</h2>

        <p className="text-gray-500 mt-2">
          Fill in your details below to check your loan approval chances.
        </p>
      </div>

      <form onSubmit={predictLoan} className="grid md:grid-cols-2 gap-6">
        {/* Gender */}

        <div>
          <label className="block mb-2 font-medium">What is your gender?</label>

          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>

        {/* Married */}

        <div>
          <label className="block mb-2 font-medium">
            What is your marital status?
          </label>

          <select
            name="Married"
            value={formData.Married}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value={1}>Married</option>
            <option value={0}>Single</option>
          </select>
        </div>

        {/* Dependents */}

        <div>
          <label className="block mb-2 font-medium">
            How many dependents do you have?
          </label>

          <input
            type="number"
            name="Dependents"
            min="0"
            max="10"
            value={formData.Dependents}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Education */}

        <div>
          <label className="block mb-2 font-medium">
            What is your highest education level?
          </label>

          <select
            name="Education"
            value={formData.Education}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value={0}>Graduate</option>
            <option value={1}>Not Graduate</option>
          </select>
        </div>

        {/* Self Employed */}

        <div>
          <label className="block mb-2 font-medium">
            Are you self-employed?
          </label>

          <select
            name="Self_Employed"
            value={formData.Self_Employed}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Credit History */}

        <div>
          <label className="block mb-2 font-medium">
            Have you repaid previous loans/EMIs on time?
          </label>

          <select
            name="Credit_History"
            value={formData.Credit_History}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value={1}>Yes, I have a good repayment history</option>

            <option value={0}>No, I have missed payments before</option>
          </select>
        </div>

        {/* Applicant Income */}

        <div>
          <label className="block mb-2 font-medium">
            What is your monthly income (₹)?
          </label>

          <input
            type="number"
            name="ApplicantIncome"
            value={formData.ApplicantIncome}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <p className="text-sm text-blue-600 mt-1">
            ₹ {formatCurrency(formData.ApplicantIncome)}
          </p>
        </div>

        {/* CoApplicant Income */}

        <div>
          <label className="block mb-2 font-medium">
            What is your co-applicant's monthly income (₹)?
          </label>

          <input
            type="number"
            name="CoapplicantIncome"
            value={formData.CoapplicantIncome}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <p className="text-sm text-blue-600 mt-1">
            ₹ {formatCurrency(formData.CoapplicantIncome)}
          </p>
        </div>

        {/* LoanAmount */}

        <div>
          <label className="block mb-2 font-medium">
            How much loan amount do you need (₹)?
          </label>

          <input
            type="number"
            name="LoanAmount"
            value={formData.LoanAmount}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <p className="text-sm text-blue-600 mt-1">
            ₹ {formatCurrency(formData.LoanAmount)}
          </p>
        </div>

        {/* Property Area */}

        <div>
          <label className="block mb-2 font-medium">
            Where is the property located?
          </label>

          <select
            name="Property_Area"
            value={formData.Property_Area}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value={2}>Urban</option>
            <option value={1}>Semi Urban</option>
            <option value={0}>Rural</option>
          </select>
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Predict Loan Approval
        </button>
      </form>

      {result && (
        <div className="mt-10">
          {/* Main Result Card */}

          <div
            className={`rounded-3xl p-8 text-white shadow-lg ${
              result.approved
                ? "bg-gradient-to-r from-green-500 to-green-700"
                : "bg-gradient-to-r from-red-500 to-red-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm uppercase tracking-wider">
                  Prediction Result
                </p>

                <h2 className="text-4xl font-bold mt-2">{result.result}</h2>

                <p className="mt-3 text-white/90">
                  {result.approved
                    ? "Based on the provided information, your loan has a strong chance of being approved."
                    : "Based on the provided information, your loan application may face approval challenges."}
                </p>
              </div>

              <div className="text-7xl">{result.approved ? "✅" : "❌"}</div>
            </div>
          </div>

          {/* Probability Cards */}

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Approved */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 font-medium">Approval Probability</p>

              <h3 className="text-4xl font-bold text-green-600 mt-2">
                {result.approved_probability}%
              </h3>

              <div className="w-full bg-green-100 rounded-full h-4 mt-5">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-700"
                  style={{
                    width: `${result.approved_probability}%`,
                  }}
                />
              </div>
            </div>

            {/* Rejected */}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 font-medium">Rejection Probability</p>

              <h3 className="text-4xl font-bold text-red-600 mt-2">
                {result.rejected_probability}%
              </h3>

              <div className="w-full bg-red-100 rounded-full h-4 mt-5">
                <div
                  className="bg-red-600 h-4 rounded-full transition-all duration-700"
                  style={{
                    width: `${result.rejected_probability}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanPredictionForm;
