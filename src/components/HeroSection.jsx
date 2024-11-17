// src/components/HeroSection.js
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="relative text-center text-gray-800 bg-cover bg-center text-white bg-gradient-to-br from-[#6A38C2] to-[#F83002] py-20 overflow-hidden rounded-lg">
      <div className="container mx-auto py-20 px-4 md:px-8">
        {/* Badge */}
        <span className="inline-block bg-white/10 text-white font-semibold rounded-full px-4 py-2 shadow-lg mb-6 animate-fadeIn duration-2000 backdrop-blur-md">
          No. 1 Global Job Platform
        </span>

        {/* Animated Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight animate-slideInUp duration-1500">
          Find, Apply & <br />
          Secure Your <span className="text-yellow-400">Dream Career</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg max-w-xl mx-auto text-gray-100 mb-8 animate-fadeInUp duration-2000">
          Explore thousands of job opportunities worldwide. Take control of your career path with the best job search platform tailored to your ambitions.
        </p>

        {/* Search Input */}
        <div className="flex items-center max-w-lg mx-auto bg-white/90 shadow-lg rounded-full overflow-hidden border border-gray-200 animate-fadeInUp duration-2000">
          <input
            type="text"
            placeholder="Search jobs worldwide"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 outline-none border-none bg-transparent text-gray-800"
          />
          <button
            onClick={searchJobHandler}
            className="bg-yellow-400 text-black px-5 py-3 hover:bg-yellow-500 transition-colors rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Background Animations */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-52 md:h-52 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white opacity-5 rounded-full animate-pulse delay-2000"></div>
    </div>
  );
};

export default HeroSection;
