import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
        <div className="bg-gray-100 min-h-screen py-5">
            <Navbar />

            {/* Hero Image Section */}
            <div className='max-w-7xl mx-auto my-10'>
                <div className='relative'>
                    <img
                        src={"https://d8it4huxumps7.cloudfront.net/uploads/images/65c614d3b0c9e_mentor_support.png?d=1500x1500"}
                        alt="Job Search Illustration"
                        className='w-full h-auto object-cover bg-blue-100 rounded-lg shadow-xl'
                    />
                </div>
            </div>

            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex flex-col md:flex-row gap-8'>
                    
                    {/* Filter Card */}
                    <div className='w-full md:w-1/4'>
                        <div className='bg-white p-4 rounded-lg shadow-lg sticky top-0'>
                            <h2 className='text-xl font-semibold mb-4 text-blue-500'>
                                TOP JOB INDIA <span className='text-red-500'>GO NOW 👍</span>
                            </h2>
                            <FilterCard />
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className='w-full md:w-3/4'>
                        {filterJobs.length <= 0 ? (
                            <div className='text-center py-10'>
                                <span className='text-gray-500 text-lg'>No jobs found 😫.</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                        className='bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300'
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default Jobs;
