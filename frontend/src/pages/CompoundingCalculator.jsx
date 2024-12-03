import React, { useState } from "react";

const CompoundingCalculator = () => {
  const [initialAmount, setInitialAmount] = useState("");
  const [riskRewardRatio, setRiskRewardRatio] = useState("");
  const [timeMonths, setTimeMonths] = useState("");
  const [winningRatio, setWinningRatio] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);

  const calculateCompounding = () => {
    const initial = parseFloat(initialAmount);
    const riskReward = parseFloat(riskRewardRatio);
    const months = parseInt(timeMonths, 10);
    const winRate = parseFloat(winningRatio) / 100;

    if (isNaN(initial) || isNaN(riskReward) || isNaN(months) || isNaN(winRate)) {
      alert("Please enter valid numerical values.");
      return;
    }

    let amount = initial;

    for (let i = 0; i < months; i++) {
      const monthlyGain = amount * winRate * riskReward; // Gain from winning trades
      const monthlyLoss = amount * (1 - winRate) * -1; // Loss from losing trades
      amount += monthlyGain + monthlyLoss; // Update the amount after trades
    }

    setFinalAmount(amount.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-100 p-6 ">
      <h1 className="text-4xl sm:text-4xl lg:text-4xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-7">
        Compounding Calculator
      </h1>

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Initial Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Initial Amount ($)</label>
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="e.g., 1000"
          />
        </div>

        {/* Risk-to-Reward Ratio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Risk-to-Reward Ratio</label>
          <input
            type="number"
            step="0.1"
            value={riskRewardRatio}
            onChange={(e) => setRiskRewardRatio(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="e.g., 2"
          />
        </div>

        {/* Time in Months */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Time in Months</label>
          <input
            type="number"
            value={timeMonths}
            onChange={(e) => setTimeMonths(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="e.g., 12"
          />
        </div>

        {/* Winning Ratio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Winning Ratio (%)</label>
          <input
            type="number"
            step="0.1"
            value={winningRatio}
            onChange={(e) => setWinningRatio(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="e.g., 80"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateCompounding}
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transform transition-all hover:scale-105"
        >
          Calculate
        </button>

        {/* Display Final Amount */}
        {finalAmount !== null && (
          <div className="mt-4 text-center text-lg font-semibold text-white">
            Final Amount: ${finalAmount}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundingCalculator;
