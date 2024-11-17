import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Menu, X } from 'lucide-react'; // Import icons for hamburger and close

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Raipur", "Chandigarh", "Gurgaon", "Noida", "Nagpur", "UP", "Maharashtra", "Goa", "Rajasthan", "Punjab", "Haryana"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "MERN Stack", "HR", "Internship"]
    },
    {
        filterType: "Salary",
        array: ["0-40,000", "42-500,000", "1 Lakh - 5 Lakhs"]
    },
    {
        filterType: "Experience",
        array: ["0-3 years", "4-7 years", "8-10 years"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State for toggling the filter
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className={`sticky top-20 bg-gray-100 p-6 rounded-lg shadow-xl w-full max-w-xs`}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden text-indigo-600 mb-4 flex items-center"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="ml-2">{isOpen ? 'Close' : 'Filters'}</span>
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <h1 className="text-xl font-semibold text-gray-800 mb-4">Filter Jobs job⬅️</h1>
                <hr className="border-gray-300 mb-6" />
                
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {
                        filterData.map((data, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-lg font-semibold text-indigo-600 mb-2">{data.filterType}</h2>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div key={itemId} className="flex items-center space-x-3 py-2 hover:bg-indigo-50 transition duration-200 rounded-md">
                                                <RadioGroupItem value={item} id={itemId} className="text-indigo-600" />
                                                <Label htmlFor={itemId} className="text-gray-700">{item}</Label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </div>
        </div>
    );
};

export default FilterCard;
