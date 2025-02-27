import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion';
import AddSection from './AddSection';
import Footer from './shared/Footer';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div> 
            <div className="bg-gray-100 min-h-screen py-10">
            <AddSection />
            <Navbar />
            <motion.div
                className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-3xl my-10 p-6 sm:p-8 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center gap-6 mb-6 md:mb-0">
                        <motion.div
                            className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Avatar className="h-full w-full rounded-full">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                                    alt="profile"
                                    className="rounded-full" // Ensure the image is also circular
                                />
                            </Avatar>
                        </motion.div>
                        <div className="flex flex-col">
                            <h1 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 ">{user?.fullname}</h1>
                            <p className="text-sm md:text-base text-gray-600 mt-2">{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2">
                            <Pen /> Edit Profile
                        </Button>
                    </motion.div>
                </div>
                <div className="my-6">
                    <div className="flex items-center gap-4 my-4">
                        <Mail className="text-gray-600" />
                        <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4 my-4">
                        <Contact className="text-gray-600" />
                        <span className="text-gray-700">{user?.phoneNumber || 'Not provided'}</span>
                    </div>
                </div>
                <div className="my-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Skills</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        {
                            user?.profile?.skills.length > 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Badge className="px-3 py-1 text-sm md:text-md bg-gray-200 text-gray-800 rounded-full shadow-md">{item}</Badge>
                                    </motion.div>
                                ))
                            ) : <span className="text-gray-500">No skills added</span>
                        }
                    </div>
                </div>
                <div className="my-6">
                    <Label className="text-lg font-bold">Resume</Label>
                    {
                        isResume ? (
                            <a
                                target='_blank'
                                href={user?.profile?.resume}
                                className="text-blue-600 hover:underline"
                            >
                                {user?.profile?.resumeOriginalName || 'View Resume'}
                            </a>
                        ) : <span className="text-gray-500">Not available</span>
                    }
                </div>
            </motion.div>

            <motion.div
                className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold mb-6">Applied Jobs</h2>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
            <Footer />
        </div>

    );
}

export default Profile;
