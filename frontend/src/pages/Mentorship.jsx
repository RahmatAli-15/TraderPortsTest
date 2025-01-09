import React from 'react';


const Mentorship = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 px-6">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-center tracking-wide text-gray-300 hover:scale-105 transform transition-all duration-300 mb-5">
                    Mentorship Program
                </h1>
                <p className="text-lg sm:text-2xl text-gray-300">
                    Unlock your potential with our step-by-step mentorship experience!
                </p>
            </div>


            {/* Steps Section */}
            <div className="w-full max-w-5xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-300 hover:scale-105 transform transition-all duration-300">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3 text-blue-400">Step 1: Contact Us</h3>
                        <p className="text-gray-300">
                            Join our program by contact us by simple call on given Number.
                        </p>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3 text-blue-400">Step 2: Match</h3>
                        <p className="text-gray-300">
                            Get paired with a mentor who matches your goals and interests.
                        </p>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3 text-blue-400">Step 3: Learn & Grow</h3>
                        <p className="text-gray-300">
                            Participate in one-on-one sessions and achieve your dreams.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <p className="text-lg sm:text-xl text-gray-300 mb-4">
                    Stay updated and be the first to know when we launch!
                </p>
                <p className="px-6 py-3 bg-blue-500 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-blue-400 transition-all">
                    +91-7983900475
                </p>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-gray-400 text-center">
                <p>&copy; {new Date().getFullYear()} Mentorship Program. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Mentorship;
