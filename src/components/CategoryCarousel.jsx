import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile Developer",
  "Ux/UI Designer",
  "Web Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide
  const [isForward, setIsForward] = useState(true); // State to track slide direction
  const intervalRef = useRef(null);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Auto-slide function with continuous looping and reverse direction
  const autoSlide = () => {
    setCurrentSlide((prevSlide) => {
      // If moving forward, increment the slide index
      if (isForward) {
        if (prevSlide === categories.length - 1) {
          setIsForward(false); // Change direction to reverse when reaching the last slide
          return prevSlide - 1;
        }
        return prevSlide + 1;
      }
      // If moving backward, decrement the slide index
      if (!isForward) {
        if (prevSlide === 0) {
          setIsForward(true); // Change direction to forward when reaching the first slide
          return prevSlide + 1;
        }
        return prevSlide - 1;
      }
    });
  };

  useEffect(() => {
    // Set the auto-slide interval
    intervalRef.current = setInterval(autoSlide, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(intervalRef.current); // Cleanup on unmount
    };
  }, [isForward]);

  const pauseAutoSlide = () => clearInterval(intervalRef.current);
  const resumeAutoSlide = () => {
    intervalRef.current = setInterval(autoSlide, 2000);
  };

  // Function to handle previous slide with looping
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
    setIsForward(false); // Change direction to backward on manual navigation
  };

  // Function to handle next slide with looping
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
    setIsForward(true); // Change direction to forward on manual navigation
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto my-16"
      onMouseEnter={pauseAutoSlide} // Pause auto-slide on hover
      onMouseLeave={resumeAutoSlide} // Resume auto-slide on leave
    >
      <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-10">Explore Job Categories</h2>
      
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)` // Slide animation
          }}
        >
          {categories.map((cat, index) => (
            <div key={index} className="min-w-full flex justify-center p-6">
              <button
                onClick={() => searchJobHandler(cat)}
                className="w-64 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-indigo-600 transform transition-transform duration-300 hover:scale-105"
              >
                {cat}
              </button>
            </div>
          ))}
        </div>

        {/* Previous and Next Arrows */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-all duration-300"
          onClick={prevSlide} // Go to previous slide with looping
        >
          ‹
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-all duration-300"
          onClick={nextSlide} // Go to next slide with looping
        >
          ›
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4">
        {categories.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full mx-2 cursor-pointer transition-colors duration-300 ${
              index === currentSlide ? 'bg-indigo-600' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)} // Jump to selected slide
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
