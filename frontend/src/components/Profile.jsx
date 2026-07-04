import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <Navbar />
            
            <div className='max-w-4xl mx-auto my-10'>
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Cover Photo */}
                    <div 
                        className="h-48 w-full bg-gradient-to-r from-brand-primary to-brand-secondary bg-cover bg-center"
                        style={user?.profile?.banner ? { backgroundImage: `url(${user.profile.banner})` } : {}}
                    ></div>
                    
                    <div className="px-8 pb-8 relative">
                        {/* Avatar & Edit Button */}
                        <div className="flex justify-between items-end -mt-12 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white rounded-full scale-110"></div>
                                <Avatar className="h-32 w-32 relative z-10 border-4 border-white shadow-md">
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                                </Avatar>
                            </div>
                            <Button onClick={() => setOpen(true)} className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm transition-all" variant="outline">
                                <Pen className="w-4 h-4 mr-2" /> Edit Profile
                            </Button>
                        </div>

                        {/* User Info Header */}
                        <div>
                            <h1 className='font-extrabold text-3xl text-gray-900'>{user?.fullname || "John Doe"}</h1>
                            <p className="text-gray-500 mt-2 text-lg max-w-2xl">{user?.profile?.bio || "Experienced professional looking for the next big challenge."}</p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            
                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Contact Information</h3>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Mail className="w-4 h-4"/></div>
                                    <span className="font-medium">{user?.email || "john.doe@example.com"}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Contact className="w-4 h-4"/></div>
                                    <span className="font-medium">{user?.phoneNumber || "+1 234 567 8900"}</span>
                                </div>
                            </div>

                            {/* Skills & Resume */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Top Skills</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {
                                            user?.profile?.skills.length > 0 
                                            ? user?.profile?.skills.map((item, index) => <Badge key={index} className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20">{item}</Badge>) 
                                            : <span className="text-gray-400 italic">No skills added yet</span>
                                        }
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Resume</h3>
                                    {
                                        isResume ? (
                                            <a target='blank' href={user?.profile?.resume} className='inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium hover:underline bg-brand-primary/5 px-4 py-2 rounded-lg transition-colors'>
                                                <Pen className="w-4 h-4" /> {user?.profile?.resumeOriginalName || "View Resume.pdf"}
                                            </a>
                                        ) : <span className="text-gray-400 italic">NA</span>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Applied Jobs Section */}
            {
                user?.role === 'student' && (
                    <div className='max-w-4xl mx-auto'>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h1 className='font-extrabold text-2xl text-gray-900 mb-6'>Applied Jobs Activity</h1>
                            {/* Applied Job Table   */}
                            <AppliedJobTable />
                        </div>
                    </div>
                )
            }
            
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile