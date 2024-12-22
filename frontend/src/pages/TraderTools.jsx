import React, { useState, useRef } from 'react';
import LotSizeCalculator from './LotSizeCalculator';
import Converter from './CurrencyConverter';
import CompoundingCalculator from './CompoundingCalculator';
import MartingaleWithHistory from './MartingaleWithHistory';
import BreakEvenCalculator from './BreakEvenCalculator';
import RangeCal from './RangeCal';
import { Gradient } from '../components/design/Roadmap';

const tools = [
  {
    name: 'lotSize',
    title: 'Lot Size Calculator',
    description: 'The Lot Size Calculator helps determine the ideal trade size based on your risk and account balance, ensuring better risk management.',
    component: <LotSizeCalculator />,
  },
  {
    name: 'compounding',
    title: 'Compounding Calculator',
    description: 'The Compounding Calculator tracks growth by calculating profits reinvested over time, helping visualize potential returns.',
    component: <CompoundingCalculator />,
  },
  {
    name: 'breakEven',
    title: 'Break Even Calculator',
    description: 'The Break Even Calculator helps determine the price point where profits equal costs, ensuring no loss or gain in the trade.',
    component: <BreakEvenCalculator />,
  },
  {
    name: 'converter',
    title: 'Currency Converter',
    description: 'The Currency Converter quickly converts amounts between different currencies using real-time exchange rates.',
    component: <Converter />,
  },
  {
    name: 'martingale',
    title: 'Martingale Calculator',
    description: 'The Martingale Calculator tracks your strategy, calculating trade sizes to recover losses and maintain profits.',
    component: <MartingaleWithHistory />,
  },
  {
    name: 'rangeCal',
    title: 'Levels Calculator',
    description: 'The Levels Calculator computes adjusted ranges based on the previous day’s high and low, helping you analyze price movements effectively.',
    component: <RangeCal />,
  },
];

const TraderTools = () => {
  const [activeTool, setActiveTool] = useState(null);
  const toolRefs = useRef({});

  const handleToolClick = (toolName) => {
    setActiveTool(toolName);

    const ref = toolRefs.current[toolName];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-extrabold text-center tracking-wide text-white hover:scale-105 transform transition-all duration-300">
          Unlock Better Trading Results with
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text hover:from-yellow-500 hover:to-pink-600 transition duration-300 ease-in-out">
            {" "}Trader
          </span>
          Ports Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map(({ name, title, description }) => (
            <div
              key={name}
              className="relative block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-6 cursor-pointer hover:scale-105 transform transition-all duration-300"
            >
              <div className="my-4">
                <h2 className="text-white text-2xl font-bold pb-2 hover:scale-105 transform transition-all duration-300">{title}</h2>
                <p className="text-gray-400 py-1">{description}</p>
              </div>
              <button
                className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border  border-indigo-300 hover:border-transparent rounded"
                onClick={() => handleToolClick(name)}
              >
                Use Tool
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {tools.map(({ name, component }) => (
            <div
              key={name}
              ref={(el) => (toolRefs.current[name] = el)}
              className={activeTool === name ? '' : 'hidden'}
            >
              {component}
            </div>
          ))}
        </div>
        <Gradient />
      </div>
    </div>
  );
};

export default TraderTools;
