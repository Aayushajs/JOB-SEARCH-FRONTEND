import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://job-search-b2.onrender.com/api/v1/banner/banners');
        
        if (!response.ok) {
          throw new Error('Failed to fetch banners');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setBanners(data);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError(err.message);
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [banners]);

  if (error) {
    return <div className="font-bold text-red-600 text-center my-4">Error: {error}</div>;
  }

  if (banners.length === 0) return <div className="font-bold text-center my-4">Loading banners...</div>;

  const handleButtonClick = (url) => {
    navigate(url);
  };

  return (
    <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] rounded-lg shadow-lg bg-white">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out rounded-lg ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 '}`}
        >
          {/* Banner Image */}
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
            onClick={() => handleButtonClick(banner.link)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400'; // Fallback image
            }}
          />
          {/* Gradient Overlay with Text */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-md">{banner.title}</h1>
            <p className="text-sm sm:text-md md:text-lg text-gray-300 mb-2 md:mb-4">{banner.subtitle}</p>
            <button
              className="bg-yellow-400 text-black font-semibold py-1 sm:py-2 px-4 sm:px-6 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg transform hover:scale-105 w-full sm:w-auto"
              onClick={() => handleButtonClick(banner.link)}
            >
              {banner.ctaText || "Learn More"}
            </button>
          </div>
        </div>
      ))}

      {/* Previous and Next Buttons */}
      <button
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
        onClick={() => setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1)}
      >
        ❮
      </button>
      <button
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
        onClick={() => setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1)}
      >
        ❯
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-yellow-400 scale-125' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
