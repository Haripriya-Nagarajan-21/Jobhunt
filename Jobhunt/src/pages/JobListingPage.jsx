import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@mui/material";
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
    logo: "https://img.freepik.com/free-vector/hand-drawn-flat-design-gathering-data-business-concept_23-2149145879.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/premium-vector/vector-illustration-programmer-flat-design-style_844724-3931.jpg"
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
    logo: "https://img.freepik.com/free-vector/hand-drawn-flat-design-devops-illustration_23-2149383352.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/premium-vector/mobile-app-development-illustration-concept-with-characters-smartphone-program-coding_269730-90.jpg"
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAsB-L2VfQVCwPzshn03e599sB92fzO3sVZGgB6vNGv11sGs8iwoYoRHxZRHG0sUddhM8&usqp=CAU"
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qDR3VcuU6OilMvmS_6WfiK5dpVDvtk3tjgoi3QX7S8JcBKXgw-4czTOCNN7X9u5ck_M&usqp=CAU"
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Se9xd6zIX5GPczUvNxn8cuHTi-x430QHGR-kR_ICabXyF9i3KVEf8tKqZCKQACwGmQo&usqp=CAU"
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9r7ueYVnoRxvoB48CEL__1M-1VMYKH3IoRjWPtNfFPWIJdRc4eSTREuRXFvc51tI_Cs&usqp=CAU"
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
    logo: "https://img.freepik.com/premium-vector/team-members-collaborating-cloudbased-version-control-continuous-deployment_269730-3473.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/free-vector/scrum-team-working-project-office_1262-19879.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/free-vector/abstract-technology-sql-illustration_23-2149229482.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/premium-vector/full-stack-developer-working-computer-it-professional-programmer-coding-website-creation-proccess-computer-technology_277904-5495.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/free-vector/gamers-play-video-game-different-hardware-platforms-cross-platform-play-cross-play-cross-platform-gaming-concept_335657-1819.jpg"
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
    logo: "https://img.freepik.com/free-vector/web-3-0-technology-isometric-with-blockchain-process-vector-illustration_1284-75508.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHs3r9jYd-2u9BeiaWI3gHooFYKhuf1lEO_FDafjiiJULJo4mGabuMAPRHEzHXQTnUsnk&usqp=CAU"
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
    logo: "https://img.freepik.com/free-vector/micro-chips-assembly-background-with-cpu-symbols-flat-vector-illustration_1284-70274.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/premium-vector/seo-analytics-concept-illustration_114360-9862.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/free-vector/customer-support-illustration_23-2148903319.jpg?semt=ais_hybrid&w=740&q=80"
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
    logo: "https://img.freepik.com/premium-vector/system-administrator-upkeeping-server-adjusting-network-pc-hardware-sysadmin-repairing-computer-administration-data-center-maintenance-service-repairman-doing-technical-work-with-server-rack_458444-1733.jpg"
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
    logo: "https://img.freepik.com/free-vector/female-multitasking-work_23-2148390868.jpg?semt=ais_hybrid&w=740&q=80"
  }
];
export default function JobListingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");

  const jobsPerPage = 5;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchQuery(query);

    let filtered = allJobs;

    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (activeFilter !== "All") {
      filtered = filtered.filter((job) => {
        if (activeFilter === "Remote") return job.location === "Remote";
        return job.type === activeFilter;
      });
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [location.search, activeFilter]);

  const handleSearch = () => {
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen w-full bg-gray-50">

      <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">

            <div className="flex md:justify-start justify-center">
              <Button
                variant="outlined"
                startIcon={<ArrowLeft />}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredJobs.length} opportunities available
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex md:justify-end justify-center">
              <div className="relative w-full md:w-[320px]">
                <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search..."
                  className="w-full pl-11 pr-28 py-2.5 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
                />

                <Button
                  variant="contained"
                  onClick={handleSearch}
                  className="!absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full"
                >
                  Search
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------- FILTER BUTTONS ---------------------- */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3">
          {["All", "Full-time", "Part-time", "Contract", "Remote"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "contained" : "outlined"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* ---------------------- JOB LIST ---------------------- */}
        <div className="space-y-6 mt-8">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="p-6 flex flex-col sm:flex-row sm:items-start">

                {/* LOGO */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 mr-4 mb-4 sm:mb-0">
                  <img src={job.logo} className="w-full h-full object-cover" />
                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  {/* TITLE + BADGE */}
                  <div className="flex flex-wrap items-center gap-3 justify-start">

                    <h2 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h2>

                    {/* Small Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                        ${
                          job.type === "Full-time"
                            ? "bg-green-100 text-green-700"
                            : job.type === "Part-time"
                            ? "bg-yellow-100 text-yellow-700"
                            : job.type === "Contract"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }
                      `}
                    >
                      {job.type}
                    </span>

                  </div>

                  {/* COMPANY */}
                  <p className="text-indigo-600 font-medium mt-1">{job.company}</p>

                  {/* META INFO */}
                  <div className="mt-3 flex flex-wrap gap-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>

                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-3 text-gray-600 text-sm">{job.description}</p>
                </div>

                {/* BUTTON */}
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <Button
                    variant="contained"
                    endIcon={<ChevronRight />}
                    className="whitespace-nowrap"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View Details
                  </Button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ---------------------- PAGINATION ---------------------- */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-gray-600 text-sm">
            Showing <b>{indexOfFirstJob + 1}</b> –{" "}
            <b>{Math.min(indexOfLastJob, filteredJobs.length)}</b> of{" "}
            <b>{filteredJobs.length}</b> jobs
          </p>

          <div className="flex flex-wrap gap-2 justify-center">

            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "contained" : "outlined"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
}
