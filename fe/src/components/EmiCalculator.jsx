import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#93c5fd"];

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(7.75);
  const [tenureYears, setTenureYears] = useState(30);

  const [result, setResult] = useState(null);

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-IN");
  };

  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, tenureYears]);

  const calculateEmi = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/calculate-emi", {
        loan_amount: loanAmount,
        interest_rate: interestRate,
        tenure_years: tenureYears,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = result
    ? [
        {
          name: "Principal",
          value: loanAmount,
        },
        {
          name: "Interest",
          value: result.total_interest,
        },
      ]
    : [];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* LEFT SIDE */}

        <div className="space-y-10">
          {/* LOAN AMOUNT */}

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="font-semibold text-lg">Loan Amount</label>

              <div className="flex items-center border rounded-xl px-3 py-2">
                <span className="mr-2 text-gray-500">₹</span>

                <input
                  type="number"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-36 outline-none text-right font-semibold"
                />
              </div>
            </div>

            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full"
            />

            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>₹1 Lakh</span>
              <span>₹1 Crore</span>
            </div>

            <div className="mt-2 text-blue-600 font-medium">
              ₹ {formatCurrency(loanAmount)}
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setLoanAmount(500000)}
                className="px-3 py-1 bg-slate-100 rounded-full hover:bg-slate-200"
              >
                5L
              </button>

              <button
                onClick={() => setLoanAmount(1000000)}
                className="px-3 py-1 bg-slate-100 rounded-full hover:bg-slate-200"
              >
                10L
              </button>

              <button
                onClick={() => setLoanAmount(2500000)}
                className="px-3 py-1 bg-slate-100 rounded-full hover:bg-slate-200"
              >
                25L
              </button>

              <button
                onClick={() => setLoanAmount(5000000)}
                className="px-3 py-1 bg-slate-100 rounded-full hover:bg-slate-200"
              >
                50L
              </button>
            </div>
          </div>

          {/* TENURE */}

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="font-semibold text-lg">Tenure</label>

              <div className="flex items-center border rounded-xl px-3 py-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-16 outline-none text-right font-semibold"
                />

                <span className="ml-2 text-gray-500">Years</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="30"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* INTEREST */}

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="font-semibold text-lg">Interest Rate</label>

              <div className="flex items-center border rounded-xl px-3 py-2">
                <input
                  type="number"
                  step="0.1"
                  min={1}
                  max={15}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-16 outline-none text-right font-semibold"
                />

                <span className="ml-2 text-gray-500">%</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}

        {result && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* RESULTS */}

            <div className="space-y-6">
              <div>
                <p className="text-gray-500">Monthly EMI</p>

                <h2 className="text-4xl font-bold text-blue-600">
                  ₹ {formatCurrency(result.monthly_emi)}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Principal Amount</p>

                <h3 className="text-2xl font-semibold">
                  ₹ {formatCurrency(loanAmount)}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Interest Amount</p>

                <h3 className="text-2xl font-semibold">
                  ₹ {formatCurrency(result.total_interest)}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Total Payment</p>

                <h3 className="text-2xl font-semibold">
                  ₹ {formatCurrency(result.total_payment)}
                </h3>
              </div>
            </div>

            {/* PIE CHART */}

            <div className="flex flex-col items-center">
              <div className="h-80 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full" />
                  Principal
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-300 rounded-full" />
                  Interest
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmiCalculator;
