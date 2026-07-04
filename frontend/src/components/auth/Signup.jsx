import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <form onSubmit={submitHandler} className='bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-12'>
                        <div className="text-center mb-8">
                            <h1 className='font-extrabold text-3xl text-gray-900 mb-2'>Create an Account</h1>
                            <p className="text-gray-500 text-sm">Join us today to kickstart your journey.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label className="text-gray-700 font-semibold mb-2 block">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold mb-2 block">Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="john@example.com"
                                    className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold mb-2 block">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="+1 234 567 890"
                                    className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold mb-2 block">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                            <div className='bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center'>
                                <Label className="text-gray-700 font-semibold mb-3 block text-center">I am a...</Label>
                                <RadioGroup className="flex items-center justify-center gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4 text-brand-primary"
                                        />
                                        <Label className="cursor-pointer font-medium text-gray-700">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4 text-brand-primary"
                                        />
                                        <Label className="cursor-pointer font-medium text-gray-700">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className='bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center'>
                                <Label className="text-gray-700 font-semibold mb-3 block text-center">Profile Picture (Optional)</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer bg-white"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <Button className="w-full h-12 rounded-xl text-lg font-semibold bg-brand-primary hover:bg-brand-primary/90 flex items-center justify-center">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                Creating account...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-semibold bg-brand-primary hover:bg-brand-primary/90 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300">
                                Sign Up
                            </Button>
                        )}

                        <p className='text-center text-gray-500 text-sm mt-6'>
                            Already have an account? <Link to="/login" className='text-brand-primary font-semibold hover:underline'>Login here</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup