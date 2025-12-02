import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Briefcase, MapPin, DollarSign, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@mui/material';

const allJobs = [
  // Previous 25 jobs array with added Part-time jobs
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "Build responsive web applications with React and TypeScript.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrj3vdpuOXlGIJLL6YyFRZezEwU7i0I1t-DgMCIVJhXtJ9cgpXx23RjhQxxIIZ5CSflO0&usqp=CAU"
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "Remote",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    posted: "1 week ago",
    description: "Create beautiful, user-friendly interfaces for our products.",
    logo: "https://www.shutterstock.com/image-vector/initial-letter-ux-logo-lowercase-260nw-1033319803.jpg"
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataSystems",
    location: "New York, NY",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Analyze complex datasets and build predictive models.",
    logo: "https://img.freepik.com/free-vector/data-points-concept-illustration_114360-2761.jpg?semt=ais_hybrid&w=740"
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Austin, TX",
    salary: "$95,000 - $130,000",
    type: "Full-time",
    posted: "Just now",
    description: "Lead product development from conception to launch.",
    logo: "IC"
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudTech",
    location: "Remote",
    salary: "$100,000 - $135,000",
    type: "Contract",
    posted: "1 day ago",
    description: "Build scalable backend systems for our cloud platform.",
    logo: "CT"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "InfraScale",
    location: "Boston, MA",
    salary: "$115,000 - $145,000",
    type: "Full-time",
    posted: "4 days ago",
    description: "Implement and maintain CI/CD pipelines.",
    logo: "IS"
  },
  {
    id: 7,
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Seattle, WA",
    salary: "$105,000 - $140,000",
    type: "Full-time",
    posted: "1 week ago",
    description: "Develop cross-platform mobile applications.",
    logo: "AW"
  },
  {
    id: 8,
    title: "QA Engineer",
    company: "QualityFirst",
    location: "Chicago, IL",
    salary: "$85,000 - $110,000",
    type: "Part-time",
    posted: "2 days ago",
    description: "Ensure product quality through automated testing.",
    logo: "QF"
  },
  {
    id: 9,
    title: "Security Specialist",
    company: "SecureNet",
    location: "Remote",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    posted: "5 days ago",
    description: "Protect systems from cybersecurity threats.",
    logo: "SN"
  },
  {
    id: 10,
    title: "AI Researcher",
    company: "DeepMind Labs",
    location: "Toronto, Canada",
    salary: "$130,000 - $170,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Advance machine learning algorithms.",
    logo: "DM"
  },
  {
    id: 11,
    title: "Technical Writer",
    company: "DocuTech",
    location: "Portland, OR",
    salary: "$75,000 - $95,000",
    type: "Part-time",
    posted: "1 week ago",
    description: "Create technical documentation for developers.",
    logo: "DT"
  },
  {
    id: 12,
    title: "Cloud Architect",
    company: "SkyCloud",
    location: "Remote",
    salary: "$140,000 - $180,000",
    type: "Full-time",
    posted: "Just now",
    description: "Design cloud infrastructure solutions.",
    logo: "SC"
  },
  {
    id: 13,
    title: "Data Engineer",
    company: "BigData Inc",
    location: "Austin, TX",
    salary: "$115,000 - $150,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "Build and maintain data pipelines.",
    logo: "BD"
  },
  {
    id: 14,
    title: "UI Developer",
    company: "PixelPerfect",
    location: "New York, NY",
    salary: "$95,000 - $125,000",
    type: "Part-time",
    posted: "1 day ago",
    description: "Implement designer mockups with precision.",
    logo: "PP"
  },
  {
    id: 15,
    title: "Scrum Master",
    company: "AgileWorks",
    location: "Remote",
    salary: "$100,000 - $130,000",
    type: "Contract",
    posted: "1 week ago",
    description: "Facilitate agile development processes.",
    logo: "AW"
  },
  {
    id: 16,
    title: "Database Admin",
    company: "DataFort",
    location: "Dallas, TX",
    salary: "$105,000 - $135,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Manage and optimize database systems.",
    logo: "DF"
  },
  {
    id: 17,
    title: "Full Stack Engineer",
    company: "WebCraft",
    location: "San Diego, CA",
    salary: "$110,000 - $145,000",
    type: "Full-time",
    posted: "Just now",
    description: "Develop end-to-end web applications.",
    logo: "WC"
  },
  {
    id: 18,
    title: "Game Developer",
    company: "PlayStudio",
    location: "Los Angeles, CA",
    salary: "$95,000 - $125,000",
    type: "Part-time",
    posted: "5 days ago",
    description: "Create engaging game experiences.",
    logo: "PS"
  },
  {
    id: 19,
    title: "Blockchain Developer",
    company: "ChainTech",
    location: "Remote",
    salary: "$130,000 - $170,000",
    type: "Contract",
    posted: "2 days ago",
    description: "Build decentralized applications.",
    logo: "CT"
  },
  {
    id: 20,
    title: "AR/VR Developer",
    company: "Immersive Labs",
    location: "San Francisco, CA",
    salary: "$120,000 - $155,000",
    type: "Full-time",
    posted: "1 week ago",
    description: "Develop immersive reality experiences.",
    logo: "IL"
  },
  {
    id: 21,
    title: "Embedded Engineer",
    company: "DeviceTech",
    location: "Boston, MA",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Program firmware for IoT devices.",
    logo: "DT"
  },
  {
    id: 22,
    title: "SEO Specialist",
    company: "SearchOptimize",
    location: "Remote",
    salary: "$80,000 - $105,000",
    type: "Part-time",
    posted: "Just now",
    description: "Improve website search rankings.",
    logo: "SO"
  },
  {
    id: 23,
    title: "IT Support",
    company: "TechSupport Plus",
    location: "Chicago, IL",
    salary: "$65,000 - $85,000",
    type: "Part-time",
    posted: "1 day ago",
    description: "Provide technical support to employees.",
    logo: "TS"
  },
  {
    id: 24,
    title: "Network Engineer",
    company: "NetConnect",
    location: "Atlanta, GA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "4 days ago",
    description: "Design and maintain network infrastructure.",
    logo: "NC"
  },
  {
    id: 25,
    title: "Marketing Specialist",
    company: "GrowthHack",
    location: "Chicago, IL",
    salary: "$75,000 - $95,000",
    type: "Part-time",
    posted: "1 week ago",
    description: "Develop and execute digital marketing campaigns.",
    logo: "GH"
  }
];

export default function JobListingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const jobsPerPage = 5;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  useEffect(() => {
    // Get search query from URL
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);

    // Filter jobs based on search query and active filter
    let filtered = allJobs;

    if (query) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (activeFilter !== 'All') {
      filtered = filtered.filter(job => job.type === activeFilter);
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when search/filter changes
  }, [location.search, activeFilter]);

  const handleSearch = () => {
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType === activeFilter ? 'All' : filterType);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="h-full w-full bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Job Opportunities Available
              {searchQuery && ` for "${searchQuery}"`}
              {activeFilter !== 'All' && ` (${activeFilter})`}
            </h1>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/')}
              startIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Home
            </Button>
          </div>

          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Job title, keywords, or company"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSearch}
              >
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full h-full">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button 
            variant={activeFilter === 'All' ? "contained" : "outlined"}
            onClick={() => handleFilterClick('All')}>
            All Jobs
          </Button>
          <Button 
            variant={activeFilter === 'Full-time' ? "contained" : "outlined"}
            onClick={() => handleFilterClick('Full-time')}>
            Full-time
          </Button>
          <Button 
            variant={activeFilter === 'Part-time' ? "contained" : "outlined"}
            onClick={() => handleFilterClick('Part-time')}>
            Part-time
          </Button>
          <Button 
            variant={activeFilter === 'Contract' ? "contained" : "outlined"}
            onClick={() => handleFilterClick('Contract')}>
            Contract
          </Button>
          <Button 
            variant={activeFilter === 'Remote' ? "contained" : "outlined"}
            onClick={() => handleFilterClick('Remote')}>
            Remote
          </Button>
        </div>

        {/* Job List */}
        <div className="space-y-6 mb-8">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start">
                    {/* Company Logo */}
                   <div className="flex-shrink-0 mr-4">
  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
    <img src={job.logo} alt="Company Logo" className="w-full h-full object-contain" />
  </div>
</div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                          <p className="text-indigo-600 font-medium">{job.company}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 
                          job.type === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
                          job.type === 'Contract' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {job.posted}
                        </div>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-600">{job.description}</p>
                    </div>
                    
                    {/* Action Button */}
                    <div className="ml-4 flex-shrink-0">
                     <Button 
  variant="contained" 
  color="primary"
  endIcon={<ChevronRight className="h-4 w-4" />}
  onClick={() => navigate(`/jobs/${job.id}`)}
>
  View Details
</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                variant="outlined" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                  navigate('/jobs');
                }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{indexOfFirstJob + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastJob, filteredJobs.length)}</span> of <span className="font-medium">{filteredJobs.length}</span> jobs
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outlined"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'contained' : 'outlined'}
                  onClick={() => setCurrentPage(page)}>
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outlined"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}