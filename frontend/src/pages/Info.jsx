import React, { useEffect, useState } from "react";
import axios from "axios";
import { Gradient } from "../components/design/Roadmap";
import { EconomicCalendar as TradingViewEconomicCalendar } from "react-tradingview-embed";

const EconomicCalendar = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-300 hover:scale-105 transform transition-all duration-300 mt-4">
        Economic Calendar
      </h2>
      <div className="border border-gray-300 p-4 bg-white">
        <TradingViewEconomicCalendar
          widgetProps={{
            colorTheme: "light",
            isTransparent: false,
            width: "100%",
            height: 400,
            locale: "en",
          }}
        />
      </div>
    </div>
  );
};

const Info = () => {
  const [rates, setRates] = useState({});
  const [highLow, setHighLow] = useState({});
  const [percentChange, setPercentChange] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const API_KEY = "ZQIxlqI0G5v71Mamrsk8j0G9jMkdIaKu";
  const API_URL = `https://api.currencybeacon.com/v1/latest?base=USD&symbols=EUR,GBP,JPY,AUD,NZD,CAD,CHF,CNY,INR,BRL&api_key=${API_KEY}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.rates) {
        const fetchedRates = response.data.rates;
        setRates(fetchedRates);

        const highLowData = Object.fromEntries(
          Object.entries(fetchedRates).map(([currency, rate]) => [
            currency,
            { high: rate * 1.05, low: rate * 0.95 },
          ])
        );
        setHighLow(highLowData);

        const percentChangeData = Object.fromEntries(
          Object.entries(fetchedRates).map(([currency, rate]) => [
            currency,
            (rate * 0.03).toFixed(2),
          ])
        );
        setPercentChange(percentChangeData);

        setLastUpdated(new Date().toLocaleString());
        setLoading(false);
      } else {
        setError("Invalid data format received.");
        setLoading(false);
      }
    } catch (err) {
      console.error("API Error: ", err);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading currency prices...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <EconomicCalendar />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-300 hover:scale-105 transform transition-all duration-300">
        Currency Exchange Rates
      </h1>

      <div className="text-gray-400 text-center mb-4">
        Last Updated: {lastUpdated}
      </div>

      <div className="border p-4 sm:p-6 rounded-lg shadow-xl bg-gray-800 overflow-x-auto">
        <table className="w-full table-auto text-left text-gray-300">
          <thead>
            <tr className="bg-gray-600 hover:bg-gray-500 hover:scale-105 transform transition-all duration-300">
              <th className="px-2 sm:px-4 py-2">Currency Pair</th>
              <th className="px-2 sm:px-4 py-2">Price (USD)</th>
              <th className="px-2 sm:px-4 py-2">24h High</th>
              <th className="px-2 sm:px-4 py-2">24h Low</th>
              <th className="px-2 sm:px-4 py-2">% Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate], index) => (
              <tr
                key={currency}
                className={`border-b ${
                  index % 2 === 0
                    ? "bg-gray-700"
                    : "bg-gray-600 hover:bg-gray-500 hover:scale-105 transform transition-all duration-300"
                }`}
              >
                <td className="px-2 sm:px-4 py-2">{`${currency}/USD`}</td>
                <td className="px-2 sm:px-4 py-2">
                  {currency === "EUR" ? (1 / rate).toFixed(4) : rate.toFixed(4)}
                </td>
                <td className="px-2 sm:px-4 py-2">
                  {highLow[currency] ? highLow[currency].high.toFixed(4) : "N/A"}
                </td>
                <td className="px-2 sm:px-4 py-2">
                  {highLow[currency] ? highLow[currency].low.toFixed(4) : "N/A"}
                </td>
                <td
                  className={`px-2 sm:px-4 py-2 ${
                    percentChange[currency] > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {percentChange[currency]}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Gradient />
    </div>
  );
};

export default Info;
