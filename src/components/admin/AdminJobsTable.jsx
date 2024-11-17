import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'; // Import Trash icon
import { useSelector, useDispatch } from 'react-redux'; // Assuming you are using Redux
import { useNavigate } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
// Import delete action from your job slice or API function

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });
    const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize dispatch to handle Redux actions

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);

        // Prepare chart data (same as before)
        const companyJobCount = {};
        filteredJobs.forEach(job => {
            const companyName = job.company.name;
            if (companyJobCount[companyName]) {
                companyJobCount[companyName]++;
            } else {
                companyJobCount[companyName] = 1;
            }
        });

        const labels = Object.keys(companyJobCount);
        const dataValues = Object.values(companyJobCount);

        setChartData({
            labels: labels,
            datasets: [{
                label: 'Total Jobs Created',
                data: dataValues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            }],
        });

        setPieChartData({
            labels: labels,
            datasets: [{
                label: 'Job Distribution by Company',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                ],
                hoverOffset: 4
            }],
        });

        const lineLabels = filteredJobs.map(job => new Date(job.createdAt).toLocaleDateString());
        const lineDataValues = filteredJobs.map(job => job.salary || 0);
        setLineChartData({
            labels: lineLabels,
            datasets: [{
                label: 'Job Salaries Over Time',
                data: lineDataValues,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
            }],
        });

    }, [allAdminJobs, searchJobByText]);

    // Function to handle job deletion
    const handleDeleteJob = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                // Dispatch action to delete job from the server or use an API call here
                await dispatch(deleteJob(jobId));
                // Update the local filterJobs state to reflect the deletion
                setFilterJobs((prevJobs) => prevJobs.filter(job => job._id !== jobId));
                alert("Job deleted successfully.");
            } catch (error) {
                console.error("Error deleting job:", error);
                alert("Failed to delete job. Please try again.");
            }
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
             {/* Job Table Section */}
             <Table className="divide-y divide-gray-200 rounded-3xl mt-4">
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold text-gray-600 bg-gray-100">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-600 bg-gray-100">Role</TableHead>
                        <TableHead className="font-semibold text-gray-600 bg-gray-100">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-600 bg-gray-100">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? filterJobs.map((job) => (
                        <TableRow key={job._id} className="hover:bg-blue-100 transition-colors duration-200">
                            <TableCell className="flex items-center gap-2">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={job?.company?.logo || '/default-logo.png'} alt={job?.company?.name} />
                                </Avatar>
                                <span className="font-medium text-gray-800">{job.company.name}</span>
                            </TableCell>
                            <TableCell className="text-gray-700">{job.title}</TableCell>
                            <TableCell className="text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <button className="text-gray-500 hover:text-blue-600">
                                            <MoreHorizontal />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-2">
                                        <button onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center text-blue-600 hover:bg-blue-100 rounded px-2 py-1">
                                            <Edit2 className="mr-2" /> Edit
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center text-green-600 hover:bg-green-100 rounded px-2 py-1">
                                            <Eye className="mr-2" /> View
                                        </button>
                                        <button onClick={() => handleDeleteJob(job._id)} className="flex items-center text-red-600 hover:bg-red-100 rounded px-2 py-1">
                                            <Trash2 className="mr-2" /> Delete
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">No jobs found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* Chart Section */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Jobs Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Bar Chart */}
                <div className="bg-white p-4 rounded-lg shadow-lg h-80">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Jobs Created by Company</h3>
                    <Bar data={chartData} options={{ /* Bar chart options */ }} />
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-4 rounded-lg shadow-lg h-80">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Distribution by Company</h3>
                    <Pie data={pieChartData} options={{ /* Pie chart options */ }} />
                </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-8 h-80">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Salaries Over Time</h3>
                <Line data={lineChartData} options={{ /* Line chart options */ }} />
            </div>

            
        </div>
    );
};

export default AdminJobsTable;
