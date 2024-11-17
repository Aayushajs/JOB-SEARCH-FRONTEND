import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div className='bg-gray-100 min-h-screen'>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className='max-w-7xl mx-auto py-10 md:py-20 px-4 md:px-8'>
                {/* Top Images Section */}
                <div className='flex flex-col gap-4 mb-10 py-10'>
                    <img
                        src={"https://d8it4huxumps7.cloudfront.net/uploads/images/655df05ad621c_frame_1000012178.png?d=1000x1000"}
                        alt="Job Search Illustration"
                        className='w-full h-auto object-cover rounded-lg shadow-xl'
                    />
                    <img
                        src={"https://d8it4huxumps7.cloudfront.net/uploads/images/65c614d3b0c9e_mentor_support.png?d=1500x1500"}
                        alt="Job Search Illustration"
                        className='w-full h-auto object-cover rounded-lg shadow-xl'
                    />
                </div>

                <h1 className='text-3xl font-bold text-gray-800 mb-8'>
                    Search Results ({allJobs.length})
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Left Side - Job Listings */}
                    <div className='md:col-span-2'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {allJobs.length > 0 ? (
                                allJobs.map((job) => {
                                    return (
                                        <Job key={job._id} job={job} />
                                    )
                                })
                            ) : (
                                <p className='col-span-full text-gray-600'>
                                    No jobs found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Browse;
