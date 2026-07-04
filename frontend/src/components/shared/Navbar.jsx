import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <h1 className='text-2xl font-extrabold tracking-tight'>Job<span className='text-brand-secondary'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-12'>
                    
                    <ul className='flex font-medium items-center gap-7 text-gray-700'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-brand-primary transition-colors">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-brand-primary transition-colors">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-brand-primary transition-colors">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-brand-primary transition-colors">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border-2 border-transparent hover:border-brand-primary transition-all shadow-sm">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white z-[100] p-4 rounded-2xl shadow-2xl border border-gray-100" sideOffset={8}>
                                    <div>
                                        <div className='flex gap-4 items-center pb-4 border-b border-gray-100'>
                                            <Avatar className="cursor-pointer w-12 h-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-bold text-gray-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-500 max-w-[180px] truncate'>{user?.profile?.bio || "No bio available"}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col mt-4 space-y-2'>
                                            <Link to="/profile" className='flex items-center gap-3 cursor-pointer text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 p-2 rounded-lg transition-colors font-medium'>
                                                <User2 className="w-5 h-5" />
                                                <span>View Profile</span>
                                            </Link>

                                            <div onClick={logoutHandler} className='flex items-center gap-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors font-medium'>
                                                <LogOut className="w-5 h-5" />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar