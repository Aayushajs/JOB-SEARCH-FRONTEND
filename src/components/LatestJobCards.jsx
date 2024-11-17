import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-6 rounded-xl bg-white border border-gray-200 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out'
      whileHover={{ scale: 1.05, shadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Company Info */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-semibold text-xl text-gray-900 truncate'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location || 'Location not specified'}</p>
      </div>

      {/* Job Title and Description */}
      <div className='mb-4'>
        <h2 className='font-bold text-2xl text-gray-800 mb-2'>{job?.title}</h2>
        <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
      </div>

      {/* Job Badges */}
      <div className='flex flex-wrap gap-3 mt-4'>
        <Badge className='text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-semibold'>
          {job?.position} Positions
        </Badge>
        <Badge className='text-red-600 bg-red-100 px-3 py-1 rounded-full font-semibold'>
          {job?.jobType}
        </Badge>
        <Badge className='text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-semibold'>
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
