import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

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
    },
    {
        _id: "4", title: "Data Scientist", description: "Analyze vast amounts of data and build predictive models using Python and TensorFlow.", location: "San Francisco, USA", salary: "20-30", position: 3, jobType: "Full Time", createdAt: new Date(Date.now() - 259200000).toISOString(),
        company: { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" }
    },
    {
        _id: "5", title: "DevOps Engineer", description: "Manage our cloud infrastructure on AWS and implement robust CI/CD pipelines.", location: "Remote", salary: "18-25", position: 2, jobType: "Full Time", createdAt: new Date(Date.now() - 432000000).toISOString(),
        company: { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" }
    },
    {
        _id: "6", title: "Product Manager", description: "Lead cross-functional teams to deliver impactful software products to our millions of users.", location: "Berlin, Germany", salary: "16-24", position: 1, jobType: "Full Time", createdAt: new Date(Date.now() - 604800000).toISOString(),
        company: { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
    }
];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const jobsSource = allJobs.length <= 0 ? dummyJobs : allJobs;
    const [filterJobs, setFilterJobs] = useState(jobsSource);

    useEffect(() => {
        const source = allJobs.length <= 0 ? dummyJobs : allJobs;
        if (searchedQuery) {
            const filteredJobs = source.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(source)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs