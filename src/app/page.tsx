import React from 'react';
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
          Welcome to Data Uploader
        </h1>
        <Link href="/upload" className="inline-block">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Upload Data
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;