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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <form onSubmit={submitHandler} className='bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-12'>
                        <div className="text-center mb-8">
                            <h1 className='font-extrabold text-3xl text-gray-900 mb-2'>Welcome Back</h1>
                            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-gray-700 font-semibold mb-2 block">Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="name@example.com"
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

                            <div className='bg-gray-50 p-4 rounded-xl border border-gray-100'>
                                <Label className="text-gray-700 font-semibold mb-3 block text-center">I am a...</Label>
                                <RadioGroup className="flex items-center justify-center gap-8">
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

                            {loading ? (
                                <Button className="w-full h-12 rounded-xl text-lg font-semibold bg-brand-primary hover:bg-brand-primary/90 flex items-center justify-center">
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                    Signing in...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full h-12 rounded-xl text-lg font-semibold bg-brand-primary hover:bg-brand-primary/90 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300">
                                    Login
                                </Button>
                            )}

                            <p className='text-center text-gray-500 text-sm mt-6'>
                                Don't have an account? <Link to="/signup" className='text-brand-primary font-semibold hover:underline'>Sign up for free</Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Login