import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import Footer from '../shared/Footer';

const AdminJobs   = () => {
  return (
    <div>
      <Navbar />
      < AdminJob />
      <Footer />
    </div>
  );
};

const AdminJob = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-20">
      <div className='md:block min-h-10 max-w-7xl mx-auto py-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-5 '>
                         
                         <img
                            src={"https://d8it4huxumps7.cloudfront.net/uploads/images/656f19b0694de_language_management.png?d=1156x372"}
                            alt="Job Search Illustration"
                            className='   rounded-3xl shadow-2xl  '
                        />
                    </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white shadow-xl rounded-xl p-8 mb-12">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            Manage Job Listings
          </h1>
          <p className="text-gray-600 mb-6">
            Use the form below to filter and manage job listings or create new ones.
          </p>
          
          {/* Filter and Add Job */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Input
              className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
              placeholder="Filter jobs by name or role..."
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => navigate('/admin/jobs/create')}
            >
              + Add New Job
            </Button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
