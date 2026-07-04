import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { Briefcase, MapPin, DollarSign, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const dummyJobs = {
    "1": { _id: "1", title: "Frontend Developer", description: "Join our team to build scalable and modern web applications using React and Tailwind CSS.", location: "Remote", salary: "12-18", position: 2, jobType: "Full Time", experienceLevel: 3, createdAt: new Date().toISOString(), applications: [], company: { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" } },
    "2": { _id: "2", title: "Backend Engineer", description: "Design and maintain high-performance API endpoints in Node.js and Express.", location: "New York, USA", salary: "15-22", position: 4, jobType: "Full Time", experienceLevel: 5, createdAt: new Date(Date.now() - 86400000).toISOString(), applications: [], company: { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" } },
    "3": { _id: "3", title: "UI/UX Designer", description: "Create stunning, user-centric designs for our next-generation mobile applications.", location: "London, UK", salary: "8-14", position: 1, jobType: "Contract", experienceLevel: 2, createdAt: new Date(Date.now() - 172800000).toISOString(), applications: [], company: { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" } }
};

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        // Handle dummy jobs locally without API call
        if (dummyJobs[jobId]) {
            setIsApplied(true);
            const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id || 'guest'}]}
            dispatch(setSingleJob(updatedSingleJob));
            toast.success("Successfully applied to " + singleJob.title);
            return;
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error applying for job");
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            // Check for dummy jobs first to avoid 404
            if (dummyJobs[jobId]) {
                dispatch(setSingleJob(dummyJobs[jobId]));
                setIsApplied(dummyJobs[jobId].applications.some(app => app.applicant === user?._id));
                return;
            }

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    if (!singleJob) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="bg-gray-50 min-h-screen pb-32">
            <Navbar />
            
            {/* Hero Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden pt-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white border border-gray-100 shadow-md rounded-2xl flex items-center justify-center p-4">
                                <img src={singleJob?.company?.logo || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"} alt="Company Logo" className="object-contain" />
                            </div>
                            <div>
                                <h1 className='font-extrabold text-3xl text-gray-900'>{singleJob?.title}</h1>
                                <p className="text-lg text-gray-500 font-medium mt-1">{singleJob?.company?.name || "Tech Company"}</p>
                                <div className='flex items-center gap-3 mt-4'>
                                    <Badge className='text-blue-700 bg-blue-50 font-semibold px-3 py-1' variant="secondary">{singleJob?.position} Positions</Badge>
                                    <Badge className='text-brand-secondary bg-orange-50 font-semibold px-3 py-1' variant="secondary">{singleJob?.jobType}</Badge>
                                    <Badge className='text-brand-primary bg-purple-50 font-semibold px-3 py-1' variant="secondary">{singleJob?.salary} LPA</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className='max-w-7xl mx-auto px-4 md:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8'>
                
                {/* Left Column: Description */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className='text-xl font-bold border-b border-gray-100 pb-4 mb-6 text-gray-900'>About the Role</h2>
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            <p>{singleJob?.description}</p>
                            
                            <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {singleJob?.requirements?.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Key Details */}
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className='text-lg font-bold border-b border-gray-100 pb-4 mb-6 text-gray-900'>Job Overview</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><MapPin className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Location</p>
                                    <p className="font-semibold text-gray-900">{singleJob?.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><DollarSign className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Salary Range</p>
                                    <p className="font-semibold text-gray-900">{singleJob?.salary} LPA</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"><Star className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Experience Needed</p>
                                    <p className="font-semibold text-gray-900">{singleJob?.experienceLevel} Years</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Users className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Applicants</p>
                                    <p className="font-semibold text-gray-900">{singleJob?.applications?.length || 0} Candidates</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><Calendar className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Posted On</p>
                                    <p className="font-semibold text-gray-900">{singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "Recently"}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
                    <div className="hidden md:block">
                        <p className="font-bold text-gray-900 text-lg">{singleJob?.title}</p>
                        <p className="text-sm text-gray-500">{singleJob?.company?.name || "Tech Company"}</p>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`ml-auto w-full md:w-auto h-12 px-8 text-lg font-semibold rounded-xl transition-all shadow-lg flex items-center gap-2 ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-brand-primary/90 hover:-translate-y-1 hover:shadow-brand-primary/30'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                        {!isApplied && <ArrowRight className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default JobDescription