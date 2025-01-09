import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../Utils';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';
import { Gradient } from '../components/design/Roadmap';

import Mentorship from './Mentorship';
import Backtesting from './Backtesting';



function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('details');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            const result = await response.json();
            handleSuccess(result?.message);
            setExpenses(result.data);


        } catch (err) {
            console.error(err);
            // Show error toast on failure
            if (!toast.isActive("delete-error")) {
                toast.error('Error deleting expense: ' + err.message, { toastId: "delete-error" });
            }
            setError(err.message);
        }
    };

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            console.error(err);
            if (!toast.isActive("fetch-error")) {
                toast.error('Error fetching expenses: ' + err.message, { toastId: "fetch-error" });
            }
            setError(err.message);
        }
    };

    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            const result = await response.json();
            handleSuccess(result?.message);
            setExpenses(result.data);
        } catch (err) {
            console.error(err);
            if (!toast.isActive("post-error")) {
                toast.error('Error adding transaction: ' + err.message, { toastId: "post-error" });
            }
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const totalProfit = expenses.reduce((sum, expense) => sum + (expense.profit || 0), 0);
    const totalLoss = expenses.reduce((sum, expense) => sum + (expense.loss || 0), 0);
    const netProfit = totalProfit - totalLoss;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 bg-gray-900 text-white p-5">
                {/* Section 1: Title */}
                <div className="mb-6 border-b border-gray-700 pb-4">
                    <h2 className="text-2xl font-extrabold hover:scale-105 transform transition-all duration-300">
                        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text hover:from-yellow-500 hover:to-pink-600 transition duration-300 ease-in-out">
                            {" "}Trader
                        </span>Ports
                    </h2>
                </div>

                {/* Section 2: Buttons */}
                <div className="flex flex-col space-y-4 ">
                    <button
                        className="text-lg text-left bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => setSelectedTab('details')}
                    >
                        Trades Summary
                    </button>
                    <button
                        className="text-lg text-left bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                        onClick={() => setSelectedTab('form')}
                    >
                        Add Trades
                    </button>
                    <button
                        className="text-lg text-left bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                        onClick={() => setSelectedTab('table')}
                    >
                        Trades Tables
                    </button>
                    
                    
                    <button
                        className="ttext-lg text-left bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => setSelectedTab('backtesting')}
                    >
                    Back Testing
                    </button>
                    
                    <button
                        className="ttext-lg text-left bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => setSelectedTab('mentorship')}
                    >
                       Mentorship
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-lg  bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded text-center"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6  bg-gray-800">
                <div className="flex justify-center items-center mb-6 p-4 rounded-lg shadow-lg">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center">
                        Welcome, {loggedInUser}
                    </h1>
                </div>

                {/* Conditional Rendering for Tabs */}
                {selectedTab === 'details' && (
                    <ExpenseDetails
                        totalProfit={totalProfit}
                        totalLoss={totalLoss}
                        netProfit={netProfit}
                    />
                )}
                {selectedTab === 'form' && (
                    <ExpenseForm addTransaction={addTransaction} />
                )}
                {selectedTab === 'table' && (
                    <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
                )}
              
                {selectedTab === 'mentorship' && <Mentorship/>}
                {selectedTab === 'backtesting' && <Backtesting/>}
            </div>

         
        </div>
    );
}

export default Home;
