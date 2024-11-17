import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import Footer from '../shared/Footer'
import BannerCarousel from '../shared/Banner'
const  Companies = () => {
    return (
      <div>
        < Companie />
        <Footer />
      </div>
    );
  };

const  Companie = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <BannerCarousel /> 
            <div className="max-w-7xl mx-auto p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center justify-between my-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 sm:mb-0">
                        Manage Companies
                    </h1>
                    <Button
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        + New Company
                    </Button>
                </div>
                
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
                    <Input
                        className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                {/* Table with a nice card-like design */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;
