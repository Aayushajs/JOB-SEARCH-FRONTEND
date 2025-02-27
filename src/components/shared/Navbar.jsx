import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, X, User2 } from 'lucide-react'; // Added Menu and X icons for hamburger
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-8 ">
                <div className="flex items-center gap-2 ">
                    <h1 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 ">
                        JOB<span className="font-ligh"> SEARCH</span>
                    </h1>
                    {/* Logo Image */}
                    <img src="https://cdn.unstop.com/uploads/images/unstop/user-referral/payment-dashboard-icon.png?d=176x177" alt="Company Logo" className="h-16 w-auto " />
                </div>
                {/* Hamburger for mobile screens */}
                <div className="lg:hidden">
                    <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
                {/* Desktop menu */}
                <div className={`lg:flex items-center gap-8 font-bold hidden ${isMobileMenuOpen ? 'block' : ''}`}>
                    <ul className="flex flex-col lg:flex-row items-center gap-6 font-medium text-gray-700 lg:gap-6">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-[#F83002]">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-[#F83002]">Jobs</Link></li>
                                    <li><Link to="/admin/courses" className="hover:text-[#F83002]">Add Course</Link></li>
                                    <li><Link to="/admin/jobs/banner" className="hover:text-[#F83002]">Add Section</Link></li>
                                    <li><Link to="/about" className="hover:text-[#F83002]">About</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-[#F83002]">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-[#F83002]">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-[#F83002]">Browse</Link></li>
                                    <li><Link to="/about" className="hover:text-[#F83002]">About</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {!user ? (
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline" className="hover:bg-gray-200">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 ">
                                <div className="p-4">
                                    <div className="flex gap-4 items-center mb-4 relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 ">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    {/* Avatar content */}
                                    <div className="flex flex-col gap-2">
                                        {user && user.role === 'student' && (
                                            <div className="flex items-center gap-2 cursor-pointer ">
                                                <User2 />
                                            </div>
                                        )}
                                        <Link to="/profile" className="relative text-1xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 ">View Profile</Link>
                                        <div className="flex items-center gap-2 cursor-pointer ">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">SignOut</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden flex flex-col items-center gap-4 font-bold p-4 bg-white shadow-lg">
                    <ul className="flex flex-col items-center gap-4 text-gray-700">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-[#F83002]">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-[#F83002]">Jobs</Link></li>
                                    <li><Link to="/admin/courses" className="hover:text-[#F83002]">Add Course</Link></li>
                                    <li><Link to="/admin/jobs/banner" className="hover:text-[#F83002]">Add Section</Link></li>
                                    <li><Link to="/about" className="hover:text-[#F83002]">About</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-[#F83002]">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-[#F83002]">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-[#F83002]">Browse</Link></li>
                                    <li><Link to="/about" className="hover:text-[#F83002]">About</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {!user ? (
                        <div className="flex flex-col items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline" className="hover:bg-gray-200">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                                </Avatar>
                            </div>
                                <Link to="/profile" className="hover:text-[#F83002]">View Profile</Link>
                            <Button variant="link" onClick={logoutHandler}>SignOut</Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
