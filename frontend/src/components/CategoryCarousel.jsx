import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Product Manager"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Double the array for seamless infinite scrolling
    const marqueeCategories = [...category, ...category, ...category];

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full bg-white py-12 overflow-hidden flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Explore Popular <span className="text-brand-primary">Categories</span></h2>
            
            <div className="relative flex w-full max-w-7xl">
                {/* Gradient Masks for smooth fading edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex w-fit animate-marquee items-center gap-6 pr-6">
                    {marqueeCategories.map((cat, index) => (
                        <div key={index} className="flex-shrink-0">
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="rounded-full px-6 py-6 text-base bg-white border-gray-200 text-gray-700 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-1 transition-all duration-300 font-medium whitespace-nowrap"
                            >
                                {cat}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCarousel;