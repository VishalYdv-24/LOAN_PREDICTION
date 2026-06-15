import Navbar from "./components/Navbar";
import EmiCalculator from "./components/EmiCalculator";
import LoanPredictionForm from "./components/LoanPredictionForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Title */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Smart Loan Assistant
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Calculate EMI and Predict Loan Approval
          </p>
        </div>
      </section>

      {/* Loan Prediction */}
      <section
        id="predict"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl font-bold mb-6">
          Loan Approval Prediction
        </h2>

        <div className="bg-white rounded-2xl shadow p-8">
          <LoanPredictionForm />
        </div>
      </section>

      {/* EMI */}
      <section
        id="emi"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl font-bold mb-6">
          EMI Calculator
        </h2>

        <div className="bg-white rounded-2xl shadow p-8">
          <EmiCalculator />
        </div>
      </section>
    </div>
  );
}

export default App;