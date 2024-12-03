import React, { useState } from 'react';

const BreakEvenCalculator = () => {
  const [entryPrice, setEntryPrice] = useState(''); // Entry price per unit
  const [commission, setCommission] = useState(''); // Commission per trade
  const [spread, setSpread] = useState(''); // Spread per unit
  const [positionSizeInLots, setPositionSizeInLots] = useState(''); // Position size in lots (forex)
  const [breakEvenPrice, setBreakEvenPrice] = useState(null);

  const unitsPerLot = 100000; // In forex, 1 standard lot = 100,000 units of the base currency

  const calculateBreakEven = () => {
    if (!entryPrice || !commission || !spread || !positionSizeInLots) {
      alert('Please fill in all fields');
      return;
    }
    
    // Convert position size in lots to position size in units
    const positionSizeInUnits = parseFloat(positionSizeInLots) * unitsPerLot;

    // Break Even Formula: Break Even = Entry Price + (Commission + Spread) / Position Size in Units
    const breakEven = parseFloat(entryPrice) + (parseFloat(commission) + parseFloat(spread)) / positionSizeInUnits;
    
    setBreakEvenPrice(breakEven.toFixed(4)); // Round to 4 decimal places
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-100 p-6">
      <h1 className="text-4xl sm:text-4xl lg:text-4xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-7">
        Break Even Calculator
      </h1>

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Entry Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Entry Price (Per Unit)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="Enter Entry Price"
          />
        </div>

        {/* Commission */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Commission (Per Trade)</label>
          <input
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="Enter Commission"
          />
        </div>

        {/* Spread */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Spread (Per Unit)</label>
          <input
            type="number"
            value={spread}
            onChange={(e) => setSpread(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="Enter Spread"
          />
        </div>

        {/* Position Size */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400">Position Size (in Lots)</label>
          <input
            type="number"
            value={positionSizeInLots}
            onChange={(e) => setPositionSizeInLots(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:outline-none transform transition-all hover:scale-105"
            placeholder="Enter Position Size in Lots"
          />
        </div>

        {/* Calculate Button */}
        <button 
          onClick={calculateBreakEven} 
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transform transition-all hover:scale-105"
        >
          Calculate Break Even Price
        </button>
        
        {/* Display Break Even Price */}
        {breakEvenPrice !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-white">Break Even Price: {breakEvenPrice}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakEvenCalculator;
