import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className='bg-gray-50 py-20'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section Title */}
        <motion.h1
          className='text-4xl font-extrabold text-center mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
        </motion.h1>

        {/* Job Cards Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allJobs.length <= 0 ? (
            <div className='col-span-3 text-center py-10'>
              <span className='text-xl text-gray-500'>No Job Available</span>
            </div>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => (
                <motion.div
                  key={job._id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <LatestJobCards job={job} />
                </motion.div>
              ))
          )}
        </motion.div>

        {/* See More Button */}
        {allJobs.length > 6 && (
          <motion.div
            className='text-center mt-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button  className='bg-[#6A38C2] text-white py-3 px-6 rounded-full shadow-lg hover:bg-[#562A9F] transition-all'>
             <a href='/browse'>  View All Jobs</a>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
