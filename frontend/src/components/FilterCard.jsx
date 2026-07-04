import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

    return (
        <div className='w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
            <div className="flex items-center justify-between mb-6">
                <h1 className='font-bold text-xl text-gray-900'>Filter Jobs</h1>
                {selectedValue && (
                    <button onClick={() => changeHandler('')} className="text-sm text-brand-primary font-medium hover:underline">
                        Clear all
                    </button>
                )}
            </div>
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className="space-y-3">
                            <h1 className='font-semibold text-gray-900 text-lg mb-2'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    const isSelected = selectedValue === item;
                                    return (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors cursor-pointer ${isSelected ? 'bg-brand-primary/5 border border-brand-primary/20' : 'hover:bg-gray-50 border border-transparent'}`}
                                            onClick={() => changeHandler(item)}
                                        >
                                            <RadioGroupItem value={item} id={itemId} className="pointer-events-none" />
                                            <Label htmlFor={itemId} className={`cursor-pointer w-full font-medium ${isSelected ? 'text-brand-primary' : 'text-gray-600'}`}>{item}</Label>
                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard