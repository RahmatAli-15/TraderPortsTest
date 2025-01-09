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
            <div className="bg-gray-700 rounded-lg p-6 mb-6 shadow-lg overflow-x-auto">
                <h3 className="text-2xl font-bold text-center text-gray-200 mb-4">
                    Forex Session Summary
                </h3>
                <table className="min-w-full table-auto border-collapse border border-gray-600">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2 border-b">Session</th>
                            <th className="px-4 py-2 border-b">Total Trades</th>
                            <th className="px-4 py-2 border-b">Profitable Trades</th>
                            <th className="px-4 py-2 border-b">Loss Trades</th>
                            <th className="px-4 py-2 border-b">Profit</th>
                            <th className="px-4 py-2 border-b">Loss</th>
                            <th className="px-4 py-2 border-b">Net Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(forexSessionSummary).map(([session, data], index) => {
                            const net = data.profit - data.loss;
                            return (
                                <tr
                                    key={index}
                                    className={`bg-gray-${index % 2 === 0 ? '700' : '800'} text-white`}
                                >
                                    <td className="px-4 py-2 border-b">{session}</td>
                                    <td className="px-4 py-2 border-b text-center">{data.totalTrades}</td>
                                    <td className="px-4 py-2 border-b text-center">{data.profitableTrades}</td>
                                    <td className="px-4 py-2 border-b text-center">{data.lossTrades}</td>
                                    <td className="px-4 py-2 border-b text-center text-green-400">₹{data.profit}</td>
                                    <td className="px-4 py-2 border-b text-center text-red-400">₹{data.loss}</td>
                                    <td className={`px-4 py-2 border-b text-center font-bold ${net >= 0 ? 'text-green-500' : 'text-red-500'}`}>₹{net}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Currency Pair Summary */}
            <div className="bg-gray-700 rounded-lg p-6 mb-6 shadow-lg overflow-x-auto">
                <h3 className="text-2xl font-bold text-center text-gray-200 mb-4">
                    Currency Pair Summary
                </h3>
                <table className="min-w-full table-auto border-collapse border border-gray-600">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2 border-b">Currency Pair</th>
                            <th className="px-4 py-2 border-b">Total Trades</th>
                            <th className="px-4 py-2 border-b">Profitable Trades</th>
                            <th className="px-4 py-2 border-b">Loss Trades</th>
                            <th className="px-4 py-2 border-b">Profit</th>
                            <th className="px-4 py-2 border-b">Loss</th>
                            <th className="px-4 py-2 border-b">Net Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(currencyPairSummary).map(([currencyPair, data], index) => {
                            const net = data.profit - data.loss;
                            return (
                                <tr
                                    key={index}
                                    className={`bg-gray-${index % 2 === 0 ? '700' : '800'} text-white`}
                                >
                                    <td className="px-4 py-2 border-b">{currencyPair}</td>
                                    <td className="px-4 py-2 border-b text-center">{data.totalTrades}</td>
                                    <td className="px-4 py-2 border-b text-center">{data.profitableTrades}</td>
                                    <td className="px-4 py-2 border-b text-center">{data.lossTrades}</td>
                                    <td className="px-4 py-2 border-b text-center text-green-400">₹{data.profit}</td>
                                    <td className="px-4 py-2 border-b text-center text-red-400">₹{data.loss}</td>
                                    <td className={`px-4 py-2 border-b text-center font-bold ${net >= 0 ? 'text-green-500' : 'text-red-500'}`}>₹{net}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Recent Trades */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-center tracking-wide text-gray-300 mb-7">
                Recent Trades
            </h2>
            {recentExpenses.length === 0 ? (
                <div className="text-center text-2xl text-red-500">
                    <p>No trades found. Please add a trade to see the full functionality</p>
                </div>
            ) : (
                recentExpenses.slice(0, 5).map((expense, index)  => (
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
                            <div className="font-bold text-green-400">
                                Profit: ₹{expense.profit || 0}
                            </div>
                            <div className="font-bold text-red-400">
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
