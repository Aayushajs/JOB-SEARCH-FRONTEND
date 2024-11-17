import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg py-20">
        <div className="flex flex-wrap md:flex-nowrap items-start">
          {/* Left Side - Job Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
            <h2 className="border-b-2 border-gray-300 font-medium py-4 text-xl mt-6">
              Job Description
            </h2>
            <div className="space-y-4 mt-4">
              <p className="font-bold text-lg">
                Role:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.title}
                </span>
              </p>
              <p className="font-bold text-lg">
                Location:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.location}
                </span>
              </p>
              <p className="font-bold text-lg">
                Description:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.description}
                </span>
              </p>
              <p className="font-bold text-lg">
                Experience:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.experience} yrs
                </span>
              </p>
              <p className="font-bold text-lg">
                Salary:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.salary} LPA
                </span>
              </p>
              <p className="font-bold text-lg">
                Total Applicants:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.applications?.length}
                </span>
              </p>
              <p className="font-bold text-lg">
                Posted Date:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.createdAt.split("T")[0]}
                </span>
              </p>
            </div>
          </div>
          {/* Right Side - Job Image */}
          <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6">
            <img
              src={
                singleJob?.company?.logo ||
                "https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734"
              }
              alt={singleJob?.company?.name}
              className="w-full h-auto rounded-lg bg-blue-100 shadow-md"
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div className="space-y-4">
            <p className="text-gray-800">
              Feel free to contact us at{" "}
              <a
                href="mailto:support@company.com"
                className="text-blue-600 hover:underline"
              >
                support@company.com
              </a>{" "}
              for any questions or additional information about the job.
            </p>
            <p className="text-gray-800">
              We encourage applicants to review our company profile and explore
              other job opportunities on our careers page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
