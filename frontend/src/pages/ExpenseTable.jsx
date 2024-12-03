import React from 'react';

const ExpenseTable = ({ expenses, deleteExpens }) => {
    // Calculate total Profit, Loss, and Net Profit
    const totalProfit = expenses.reduce((sum, expense) => sum + (expense.profit || 0), 0);
    const totalLoss = expenses.reduce((sum, expense) => sum + (expense.loss || 0), 0);
    const netProfit = totalProfit - totalLoss;

    // Calculate Profit and Loss by Forex Session
    const forexSessionSummary = expenses.reduce((acc, expense) => {
        const session = expense.forexSession || 'Unknown';
        if (!acc[session]) {
            acc[session] = { 
                profit: 0, 
                loss: 0, 
                totalTrades: 0, 
                profitableTrades: 0, 
                lossTrades: 0 
            };
        }
        acc[session].profit += expense.profit || 0;
        acc[session].loss += expense.loss || 0;
        acc[session].totalTrades += 1;
        if (expense.profit > 0) acc[session].profitableTrades += 1;
        if (expense.loss > 0) acc[session].lossTrades += 1;
        return acc;
    }, {});

    // Calculate Profit and Loss by Currency Pair
    const currencyPairSummary = expenses.reduce((acc, expense) => {
        const currencyPair = expense.currencyPair || 'Unknown';
        if (!acc[currencyPair]) {
            acc[currencyPair] = { 
                profit: 0, 
                loss: 0,
                totalTrades: 0,
                profitableTrades: 0,
                lossTrades: 0,
            };
        }
        acc[currencyPair].profit += expense.profit || 0;
        acc[currencyPair].loss += expense.loss || 0;
        acc[currencyPair].totalTrades += 1;
        if (expense.profit > 0) acc[currencyPair].profitableTrades += 1;
        if (expense.loss > 0) acc[currencyPair].lossTrades += 1;
        return acc;
    }, {});

    // Reverse expenses for most recent trades at the top
    const recentExpenses = [...expenses].reverse();

    return (
        <div className="space-y-6">
            {/* Forex Session Summary */}
            <div className="bg-gray-700 rounded-lg p-6 mb-6 shadow-lg">
                <h3 className="text-2xl font-bold text-center text-gray-200 hover:scale-105 transform transition-all duration-300 mb-4 mt-4">
                    Forex Session Summary
                </h3>
                <div className="space-y-4">
                    {Object.entries(forexSessionSummary).map(([session, data], index) => {
                        const net = data.profit - data.loss; // Calculate net profit/loss
                        return (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transform transition-all duration-300"
                            >
                                <div className="text-gray-300 text-lg font-semibold w-full md:w-1/5 text-center md:text-left">
                                    {session}
                                </div>
                                <div className="text-gray-400 w-full md:w-1/5 text-center">
                                    Total Trades: {data.totalTrades}
                                </div>
                                <div className="text-green-400 w-full md:w-1/5 text-center">
                                    Profitable Trades: {data.profitableTrades}
                                </div>
                                <div className="text-red-400 w-full md:w-1/5 text-center">
                                    Loss Trades: {data.lossTrades}
                                </div>
                                <div className="text-green-400 font-bold w-full md:w-1/5 text-center">
                                    Profit: ₹{data.profit}
                                </div>
                                <div className="text-red-400 font-bold w-full md:w-1/5 text-center">
                                    Loss: ₹{data.loss}
                                </div>
                                <div
                                    className={`font-bold w-full md:w-1/5 text-center ${net >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    Net Amount: ₹{net}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Currency Pair Summary */}
            <div className="bg-gray-700 rounded-lg p-6 mb-6 shadow-lg">
                <h3 className="text-2xl font-bold text-center text-gray-200 hover:scale-105 transform transition-all duration-300 mb-4 mt-4">
                    Currency Pair Summary
                </h3>
                <div className="space-y-4">
                    {Object.entries(currencyPairSummary).map(([currencyPair, data], index) => {
                        const net = data.profit - data.loss; // Calculate net profit/loss for currency pair
                        return (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transform transition-all duration-300"
                            >
                                <div className="text-gray-300 text-lg font-semibold w-full md:w-1/5 text-center md:text-left">
                                    {currencyPair}
                                </div>
                                <div className="text-gray-400 w-full md:w-1/5 text-center">
                                    Total Trades: {data.totalTrades}
                                </div>
                                <div className="text-green-400 w-full md:w-1/5 text-center">
                                    Profitable Trades: {data.profitableTrades}
                                </div>
                                <div className="text-red-400 w-full md:w-1/5 text-center">
                                    Loss Trades: {data.lossTrades}
                                </div>
                                <div className="text-green-400 font-bold w-full md:w-1/5 text-center">
                                    Profit: ₹{data.profit}
                                </div>
                                <div className="text-red-400 font-bold w-full md:w-1/5 text-center">
                                    Loss: ₹{data.loss}
                                </div>
                                <div
                                    className={`font-bold w-full md:w-1/5 text-center ${net >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    Net Amount: ₹{net}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Trades */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-7 mt-7">
                Recent Trades
            </h2>
            {recentExpenses.length === 0 ? (
                <div className="text-center text-2xl text-red-500">
                    <p>No trades found. Please add a trade to see the full functionality</p>
                </div>
            ) : (
                recentExpenses.map((expense, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col p-5 rounded-lg shadow-lg space-y-3 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}
                    >
                        {/* Delete Button */}
                        <button
                            className="absolute top-3 right-3 text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full"
                            onClick={() => deleteExpens(expense._id)}
                        >
                            Delete
                        </button>

                        {/* Currency Pair and Date */}
                        <div className="text-white font-semibold text-xl">{expense.currencyPair}</div>
                        <div className="text-sm text-gray-400">
                            Date: {new Date(expense.createdAt).toLocaleDateString()}
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-wrap justify-between gap-3 text-base text-gray-300">
                            <div>Forex Session: {expense.forexSession}</div>
                            <div>Strategy: {expense.strategyUsed}</div>
                            <div>Target (Pips): {expense.target}</div>
                            <div>Stoploss (Pips): {expense.stoploss}</div>
                            <div>Buy/Sell: {expense.buyOrSell}</div>
                            <div className={"font-bold text-green-400"}>
                                Profit: ₹{expense.profit || 0}
                            </div>
                            <div className={"font-bold text-red-400"}>
                                Loss: ₹{expense.loss || 0}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ExpenseTable;
