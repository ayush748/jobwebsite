import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-white min-h-[85vh] flex items-center'>
            {/* Background decorative elements */}
            <div className='absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl opacity-60'></div>
            <div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-3xl opacity-60'></div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    
                    {/* Left Column - Content */}
                    <div className='flex flex-col gap-8'>
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary font-semibold w-fit border border-brand-secondary/20'
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span>No. 1 Job Hunt Website</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className='text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900'
                        >
                            Find your next <br/>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600'>Dream Job</span> <br/>
                            with zero hassle.
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='text-lg md:text-xl text-gray-600 max-w-lg'
                        >
                            Join thousands of professionals who have found their perfect role. Search millions of jobs, companies, and salaries all in one place.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='flex w-full max-w-md glassmorphism p-2 rounded-full items-center gap-4 transition-all focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-brand-primary/20 bg-white shadow-xl'
                        >
                            <div className="pl-4 text-gray-400"><Search className="w-5 h-5"/></div>
                            <input
                                type="text"
                                placeholder='Job title, keyword or company...'
                                onChange={(e) => setQuery(e.target.value)}
                                className='outline-none border-none w-full bg-transparent py-3 text-gray-700 placeholder:text-gray-400 font-medium'
                            />
                            <Button onClick={searchJobHandler} className="rounded-full bg-brand-primary hover:bg-brand-primary/90 h-12 px-8 flex items-center justify-center transition-transform hover:scale-105 shadow-md">
                                Search
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column - Visuals */}
                    <div className='hidden lg:flex relative h-full min-h-[500px] w-full justify-center items-center'>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                            className="relative z-10 w-full max-w-md"
                        >
                            {/* Mock Dashboard / Abstract Card */}
                            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                                
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Senior Developer</h3>
                                        <p className="text-gray-500 text-sm">TechCorp Inc.</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
                                    <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                                    <div className="h-2 bg-gray-100 rounded-full w-5/6"></div>
                                </div>
                                
                                <div className="mt-8 flex gap-3">
                                    <div className="px-4 py-2 bg-purple-50 text-brand-primary rounded-full text-sm font-semibold border border-purple-100">Full Time</div>
                                    <div className="px-4 py-2 bg-orange-50 text-brand-secondary rounded-full text-sm font-semibold border border-orange-100">Remote</div>
                                </div>
                            </div>
                            
                            {/* Floating Element 1 */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">🚀</div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">10k+ Jobs</p>
                                    <p className="text-xs text-gray-500">Added this week</p>
                                </div>
                            </motion.div>

                            {/* Floating Element 2 */}
                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="w-8 h-8 object-contain" />
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Now Hiring</p>
                                    <p className="text-xs text-gray-500">View 400+ roles</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HeroSection