import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

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

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const jobsToDisplay = allJobs.length <= 0 ? dummyJobs : allJobs;
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'><span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    jobsToDisplay.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs