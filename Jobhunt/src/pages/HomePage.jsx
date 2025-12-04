import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Home, User, Bell, Mail, Shield, Check } from 'lucide-react';
import { Button, Typography } from '@mui/material';
import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      title: "Smart Job Matching",
      description: "Our AI matches you with jobs that fit your skills and preferences",
      icon: <Shield className="h-8 w-8 text-indigo-600" />
    },
    {
      title: "ATS Optimization",
      description: "Get instant feedback on how to improve your resume for applicant tracking systems",
      icon: <Check className="h-8 w-8 text-indigo-600" />
    },
    {
      title: "Application Tracker",
      description: "Organize and track all your job applications in one place",
      icon: <Mail className="h-8 w-8 text-indigo-600" />
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#e0e7ff] via-white to-[#cfe9ff] flex flex-col font-sans">

      <nav className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50 w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center shadow">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <Typography variant="h6" className="text-indigo-700 font-bold">
                JobHunt
              </Typography>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
              <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 font-medium">Job Board</Link>
              <Link to="/resume-builder" className="text-gray-700 hover:text-indigo-600 font-medium">Resume Builder</Link>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-500 hover:text-indigo-600">
                <Bell className="h-5 w-5" />
              </button>
             <button
  className="text-gray-500 hover:text-indigo-600"
  onClick={() => navigate('/profile')}
>
  <UserCircle className="h-6 w-6" />
</button>

              <Button
                variant="outlined"
                className="text-indigo-600 border-indigo-500"
                onClick={() => navigate('/login')}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button
                variant="contained"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                component={Link}
                to="/register">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-grow w-full flex items-center bg-gradient-to-tr from-indigo-200 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Hunt Your <span className="text-indigo-600">Perfect Job</span> Like a Pro
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">
              Advanced job search tools and AI resume feedback to help you land your dream role faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="contained"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="large"
                component={Link}
                to="/jobs">
                Browse Jobs
              </Button>
              <Button
                variant="outlined"
                className="border-indigo-500 text-indigo-600"
                size="large"
                component={Link}
                to="/resume-builder">
                Build Your Resume
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-80 md:h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740"
                  alt="Job Hunter Illustration"
                  className="object-contain h-full w-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-200 rounded-full opacity-50 blur-sm"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-200 rounded-full opacity-50 blur-sm"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Gradient Background */}
  
<section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <Typography variant="h4" className="font-bold text-gray-900">
        Supercharge Your Job Hunt
      </Typography>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        Tools designed to give you every advantage in your job search.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
      {features.map((f, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow-md border border-gray-100 p-6 rounded-xl cursor-pointer hover:shadow-2xl transition flex flex-col items-center"
        >
          <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 shadow">
            {f.icon}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {f.title}
          </h3>

          <p className="text-gray-600 text-sm text-center max-w-xs">
            {f.description}
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>

    </div>
  );
}