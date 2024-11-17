import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    // Area Chart Data
    const areaChartData = {
        labels: filterCompany.map((company) => new Date(company.createdAt).toLocaleDateString()),
        datasets: [
            {
                label: 'Growth Over Time',
                data: filterCompany.map(() => Math.floor(Math.random() * 10) + 1), // Replace with actual growth data
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.4,
            },
        ],
    };

    // Bar Chart Data
    const barChartData = {
        labels: filterCompany.map((company) => company.name),
        datasets: [
            {
                label: 'Number of Employees',
                data: filterCompany.map(() => Math.floor(Math.random() * 100) + 1), // Replace with actual employee data
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Pie Chart Data
    const pieChartData = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                data: [filterCompany.length, 100 - filterCompany.length], // Replace with actual active/inactive data
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4,
            },
        ],
    };

    // Gauge Chart Value
    const gaugeValue = (filterCompany.length / 100) * 100; // Example value (change as needed)

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            {/* Companies Table */}
            <Table className="min-w-full">
                <TableCaption className="text-lg font-semibold mb-4 text-gray-700">
                    Recent Registered Companies
                </TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="text-left text-gray-600">Logo</TableHead>
                        <TableHead className="text-left text-gray-600">Name</TableHead>
                        <TableHead className="text-left text-gray-600">Date</TableHead>
                        <TableHead className="text-right text-gray-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((company) => (
                        <TableRow key={company._id} className="hover:bg-gray-50 transition-colors duration-200">
                            <TableCell>
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium text-gray-800">{company.name}</TableCell>
                            <TableCell className="text-gray-600">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <button className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="More options">
                                            <MoreHorizontal />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="flex flex-col">
                                            <button
                                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            >
                                                <Edit2 />
                                                <span>Edit</span>
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Company Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Area Chart */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
                    <h3 className="text-xl font-semibold mb-4">Growth Over Time</h3>
                    <Line
                        data={areaChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Growth of Companies',
                                    color: 'white',
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                            },
                        }}
                    />
                </div>

                {/* Bar Chart */}
                <div className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-lg shadow-md text-white">
                    <h3 className="text-xl font-semibold mb-4">Employee Count</h3>
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Employee Distribution',
                                    color: 'white',
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Pie Chart */}
                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-10 h-96 rounded-lg shadow-md text-white">
                    <h3 className="text-xl font-semibold mb-1">Active vs Inactive Companies</h3>
                    <Pie
                        data={pieChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Company Status',
                                    color: 'white',
                                },
                            },
                        }}
                    />
                </div>

                {/* Gauge Chart */}
                <div className="bg-gradient-to-br from-red-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
                    <h3 className="text-xl font-semibold mb-4">Company Performance Gauge</h3>
                    <GaugeChart
                        id="gauge-chart"
                        value={gaugeValue / 100}
                        textColor={'white'}
                        arcsLength={[0.3, 0.3, 0.4]}
                        colors={['#FF5D5D', '#FFDD5D', '#5DFF7A']}
                        style={{ height: '200px' }}
                    />
                    <div className="text-center mt-2">Performance: {Math.round(gaugeValue)}%</div>
                </div>
            </div>
        </div>
    );
};

export default CompaniesTable;
