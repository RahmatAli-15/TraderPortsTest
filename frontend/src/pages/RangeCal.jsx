import React, { useState } from "react";

function RangeCal() {
  const [dayHigh, setDayHigh] = useState("");
  const [dayLow, setDayLow] = useState("");
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    const high = parseFloat(dayHigh);
    const low = parseFloat(dayLow);

    if (isNaN(high) || isNaN(low)) {
      alert("Please enter valid numbers for both day high and day low prices.");
      return;
    }

    // Step 1: Calculate the range
    const range = high - low;

    // Step 2: Calculate the length by dividing by 287
    const length = range / 287;

    // Step 3: Convert the range to its last 4 digits using divide operation
    const approxRange = range / 100;

    // Step 4: Subtract the length from the four-digit range
    let adjustedRange = parseFloat((approxRange - length).toFixed(4));

    // Step 5: Divide by 2 until less than 750
    while (adjustedRange > 750) {
      adjustedRange /= 2;
    }

    setResult(adjustedRange.toFixed(4));
  };

  return (
  
     
    <div
      className="calculator-container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
       <h1 className="text-4xl sm:text-4xl lg:text-4xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-7">Levels Calculator</h1>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "5px",
          }}
        >
          Previous Day High (till 2nd decimal):
        </label>
        <input
          type="number"
          value={dayHigh}
          onChange={(e) => setDayHigh(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "5px",
          }}
        >
          Previous Day Low (till 2nd decimal):
        </label>
        <input
          type="number"
          value={dayLow}
          onChange={(e) => setDayLow(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <button
        onClick={calculateResult}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Calculate
      </button>

      {result !== null && (
  <div className="mt-6 text-center">
    <h3 className="text-2xl sm:text-2xl lg:text-2xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300">
      Level Range
    </h3>
    <p className="text-lg  text-white mt-2">
      {result}
    </p>
  </div>
)}

    </div>
    
  );
}

export default RangeCal;
