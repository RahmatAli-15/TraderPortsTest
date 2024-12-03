import React, { useState } from "react";

const MartingaleWithHistory = () => {
  const [step, setStep] = useState(1); // Step tracker: 1 - Initial, 2 - Win/Loss, 3 - Next trade
  const [initialTrade, setInitialTrade] = useState(""); // Initial trade amount
  const [currentTrade, setCurrentTrade] = useState(0); // Current trade amount
  const [totalAmount, setTotalAmount] = useState(0); // Total amount after each trade
  const [winAmount, setWinAmount] = useState(""); // Win amount input
  const [lossAmount, setLossAmount] = useState(""); // Loss amount input
  const [tradeHistory, setTradeHistory] = useState([]); // Track trade history
  const [nextTradeMessage, setNextTradeMessage] = useState(""); // Message for the next trade
  const [showResultButtons, setShowResultButtons] = useState(true); // Show result buttons after each trade

  const handleStart = () => {
    if (!initialTrade || initialTrade <= 0) {
      alert("Please enter a valid initial trade amount.");
      return;
    }
    setTotalAmount(Number(initialTrade)); // Initialize total amount with the initial trade
    setCurrentTrade(Number(initialTrade)); // Set initial trade amount for first trade
    setStep(2); // Move to win/loss result step
    setNextTradeMessage(""); // Clear any previous messages
  };

  const handleTradeResult = (result) => {
    const isWin = result === "win";

    const newHistory = [
      ...tradeHistory,
      {
        tradeAmount: currentTrade,
        result: isWin ? "Win" : "Loss",
      },
    ];

    setTradeHistory(newHistory);

    if (isWin) {
      // Update total amount if it's a win
      setTotalAmount((prev) => prev + Number(winAmount));
      setNextTradeMessage(`You won! Your new total amount is $${totalAmount + Number(winAmount)}`);
      setCurrentTrade(Number(initialTrade)); // Reset next trade amount to initial trade
    } else {
      // Update total amount if it's a loss
      setTotalAmount((prev) => prev - Number(lossAmount));
      setNextTradeMessage(`You lost. Your new total amount is $${totalAmount - Number(lossAmount)}`);
      setCurrentTrade(currentTrade * 2.5); // Apply Martingale strategy: double the trade amount
    }

    setShowResultButtons(false); // Hide result buttons after submitting result
  };

  const proceedToNextTrade = () => {
    setShowResultButtons(true); // Show result buttons for the next trade
    setStep(2); // Go back to win/loss result step for the next trade
    setNextTradeMessage(""); // Clear message
  };

  const resetCalculator = () => {
    setStep(1); // Reset to step 1
    setInitialTrade("");
    setCurrentTrade(0);
    setTotalAmount(0);
    setWinAmount("");
    setLossAmount("");
    setTradeHistory([]);
    setNextTradeMessage("");
    setShowResultButtons(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-100 p-6">
      <h1 className="text-4xl sm:text-4xl lg:text-4xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-7">Martingale Calculator</h1>

      {/* Step 1: Enter Initial Trade Amount */}
      {step === 1 && (
        <div className="space-y-4  w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <label className="block text-gray-200 font-medium">Enter Initial Trade Amount:</label>
          <input
            type="number"
            value={initialTrade}
            onChange={(e) => setInitialTrade(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="e.g., 100"
          />
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Start Trading
          </button>
        </div>
      )}

      {/* Step 2: Win or Loss Result */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-gray-300 font-large">Current Trade Amount: ${currentTrade.toFixed(2)}</p>

          <div className="flex space-x-4">
            {showResultButtons && (
              <>
                <button
                  onClick={() => {
                    setStep(3); // Proceed to win amount input
                    setNextTradeMessage("Please enter the win amount.");
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Win
                </button>
                <button
                  onClick={() => {
                    setStep(4); // Proceed to loss amount input
                    setNextTradeMessage("Please enter the loss amount.");
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                  Loss
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Enter Win Amount */}
      {step === 3 && (
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">Enter Win Amount:</label>
          <input
            type="number"
            value={winAmount}
            onChange={(e) => setWinAmount(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="e.g., 20"
          />
          <button
            onClick={() => handleTradeResult("win")}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Submit Win Amount
          </button>
        </div>
      )}

      {/* Step 4: Enter Loss Amount */}
      {step === 4 && (
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">Enter Loss Amount:</label>
          <input
            type="number"
            value={lossAmount}
            onChange={(e) => setLossAmount(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="e.g., 10"
          />
          <button
            onClick={() => handleTradeResult("loss")}
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Submit Loss Amount
          </button>
        </div>
      )}

      {/* Trade History */}
      <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-white text-center">Trade History</h3>
        <ul className="space-y-2">
          {tradeHistory.map((trade, index) => (
            <li key={index} className="text-gray-300">
              <span className={`font-semibold ${trade.result === "Win" ? "text-green-500" : "text-red-500"}`}>
                {trade.result}: ${trade.tradeAmount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Trade or Reset */}
      {nextTradeMessage && (
        <div className="mt-4 text-white text-center">
          <p>{nextTradeMessage}</p>
          {step === 3 || step === 4 ? (
            <button
              onClick={proceedToNextTrade}
              className="bg-indigo-500 text-white px-4 py-2 rounded mt-2"
            >
              Proceed to Next Trade
            </button>
          ) : (
            <button
              onClick={resetCalculator}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
            >
              Reset Calculator
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MartingaleWithHistory;
