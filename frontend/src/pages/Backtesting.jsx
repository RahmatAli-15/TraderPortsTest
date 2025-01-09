import React, { useState } from 'react';
import z from "../assets/z.png";
import y from "../assets/y.png";
import x from "../assets/x.png";

const Backtesting = () => {
    const [showSlider, setShowSlider] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState(null);

    const handleButtonClick = () => {
        setShowSlider(true);
    };

    const handleImageClick = (image) => {
        setFullScreenImage(image);
    };

    const handleCloseFullScreen = () => {
        setFullScreenImage(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 px-6">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-4">
                    Backtesting Process
                </h1>
                <p className="text-xl sm:text-xl text-gray-300">
                    Validate your trading strategies with ease.
                </p>
            </div>

            {/* Steps Section */}
            <div className="w-full max-w-5xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-300 hover:scale-105 transform transition-all duration-300">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3 text-blue-400">Step 1: Contact Us</h3>
                        <p className="text-gray-300">
                            Join our program by contacting us through a simple call on the given number.
                        </p>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3 text-blue-400">Step 2: Match</h3>
                        <p className="text-gray-300">
                            Get paired with a mentor who matches your goals and interests.
                        </p>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3 text-blue-400">Step 3: Learn & Grow</h3>
                        <p className="text-gray-300">
                            Participate in one-on-one sessions and achieve your dreams.
                        </p>
                    </div>
                </div>
            </div>


            {/* Call to Action */}
            <div className="mt-12 text-center">
                <p className="text-lg sm:text-xl text-gray-300 mb-6">
                    Ready to see how your strategy performs?
                </p>
                <button
                    className="px-6 py-3 bg-blue-500 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-blue-400 transition-all"
                    onClick={handleButtonClick}
                >
                    See Results
                </button>
            </div>

            {/* Slider Section */}
            {showSlider && (
                <div className="mt-12 w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-center text-blue-400 mb-4">
                        Strategy Data Preview
                    </h3>
                    <div className="flex flex-col items-center">
                        {/* Other Images */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            <img
                                src={x}
                                alt="Image 1"
                                className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-all"
                                onClick={() => handleImageClick(x)}
                            />
                            <img
                                src={y}
                                alt="Image 2"
                                className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-all"
                                onClick={() => handleImageClick(y)}
                            />
                            <img
                                src={z}
                                alt="Image 3"
                                className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-all"
                                onClick={() => handleImageClick(z)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Image */}
            {fullScreenImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <img
                        src={fullScreenImage}
                        alt="Full Screen"
                        className="w-auto max-w-3xl max-h-full object-contain"
                    />
                    <button
                        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                        onClick={handleCloseFullScreen}
                    >
                        Close
                    </button>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-16 text-gray-400 text-center">
                <p>&copy; {new Date().getFullYear()} Backtesting Program. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Backtesting;
