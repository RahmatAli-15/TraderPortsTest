import React, { useState } from "react";
import axios from "axios";

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "INR", name: "Indian Rupee" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "AED", name: "UAE Dirham" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "XAU", name: "Gold (per ounce)" },
    { code: "XAG", name: "Silver (per ounce)" },
  ];

  const handleConvert = async () => {
    try {
      const apiKey = "ZQIxlqI0G5v71Mamrsk8j0G9jMkdIaKu"; // Replace with your API key
      const url = `https://api.currencybeacon.com/v1/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${apiKey}`;

      const response = await axios.get(url);
      const convertedAmount = response.data.response.value;
      setResult(convertedAmount);
      setError("");
    } catch (err) {
      setError("Error fetching conversion data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-100 p-6  ">
      <h1 className="text-4xl sm:text-4xl lg:text-4xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-7">Currency Converter</h1>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex gap-4 mb-4 ">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="Amount"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-4 py-2 rounded w-1/4 mx-auto justify-center block"
        >
          Convert
        </button>
        {result && (
          <div className="mt-4 text-center text-lg">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </div>
        )}
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Converter;
