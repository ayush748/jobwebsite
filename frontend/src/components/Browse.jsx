import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const dummyJobs = [
    {
        _id: "1", title: "Frontend Developer", description: "Join our team to build scalable and modern web applications using React and Tailwind CSS.", location: "Remote", salary: "12-18", position: 2, jobType: "Full Time", createdAt: new Date().toISOString(),
        company: { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" }
    },
    {
        _id: "2", title: "Backend Engineer", description: "Design and maintain high-performance API endpoints in Node.js and Express.", location: "New York, USA", salary: "15-22", position: 4, jobType: "Full Time", createdAt: new Date(Date.now() - 86400000).toISOString(),
        company: { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" }
    },
    {
        _id: "3", title: "UI/UX Designer", description: "Create stunning, user-centric designs for our next-generation mobile applications.", location: "London, UK", salary: "8-14", position: 1, jobType: "Contract", createdAt: new Date(Date.now() - 172800000).toISOString(),
        company: { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" }
    }
];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

    const jobsToDisplay = allJobs.length <= 0 ? dummyJobs : allJobs;

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 md:px-8'>
                <h1 className='font-extrabold text-2xl my-10 text-gray-900'>Search Results ({jobsToDisplay.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        jobsToDisplay.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse