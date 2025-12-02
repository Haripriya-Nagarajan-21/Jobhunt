import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowLeft, MapPin, DollarSign, Clock, Check } from 'lucide-react';

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
export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = allJobs.find(job => job.id === parseInt(id || ''));

  if (!job) {
    return (
      <div className="h-full w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Button variant="contained" onClick={() => navigate('/jobs')}>
            Back to Job Listings
          </Button>
        </div>
      </div>
    );
  }

  const requirements = [
    "3+ years of experience in a similar role",
    "Bachelor's degree in Computer Science or related field",
    "Strong problem-solving skills",
    "Excellent communication abilities"
  ];

  const responsibilities = [
    "Develop and maintain web applications",
    "Collaborate with cross-functional teams",
    "Write clean, maintainable code",
    "Participate in code reviews"
  ];

  const benefits = [
    "Competitive salary and bonuses",
    "Health, dental, and vision insurance",
    "401(k) matching",
    "Flexible work hours",
    "Remote work options"
  ];

  return (
    <div className="h-full w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="outlined" 
              onClick={() => navigate('/jobs')} 
              startIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Jobs
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Job Details</h1>
            <div className="w-40"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Job Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
               <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden">
  <img 
    src={job.logo} 
    alt="Company Logo"
    className="w-full h-full object-cover"
  />
</div>

              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                    <p className="text-indigo-600 font-medium text-lg">{job.company}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 
                    job.type === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
                    job.type === 'Contract' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {job.type}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-medium">Location:</span> {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-medium">Salary:</span> {job.salary}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-medium">Posted:</span> {job.posted}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {responsibilities.map((res, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                    {res}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-4 w-4 text-purple-500 mr-2 mt-1" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right">
            <Button
  variant="contained"
  color="primary"
  onClick={() =>
   navigate(`/jobs/${job.id}/apply`, { state: { jobs: allJobs } })

  }
>
  Apply Now
</Button>
          </div>
        </div>
      </div>
    </div>
  );
}