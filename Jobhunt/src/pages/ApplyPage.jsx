import { useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, LinearProgress, Alert, AlertTitle } from '@mui/material';
import { Upload, FileText, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const jobs = state?.jobs || [];
  const job = jobs.find(job => job.id === parseInt(id));
  const fileInputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setAtsScore(null);
      setAnalysisComplete(false);
    }
  };

  const analyzeResume = () => {
    if (!resume) return;
    
    setIsAnalyzing(true);
   
    setTimeout(() => {
      const score = Math.floor(Math.random() * 41) + 60; // Random score between 60-100
      setAtsScore(score);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const submitApplication = () => {

    setTimeout(() => {
      setApplicationSubmitted(true);
    }, 1000);
  };

  if (!job) {
    return (
      <div className="h-full w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Button 
            variant="contained" 
            onClick={() => navigate('/jobs')}
          >
            Back to Job Listings
          </Button>
        </div>
      </div>
    );
  }

  if (applicationSubmitted) {
    return (
      <div className="h-full w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your application for {job.title} at {job.company} has been successfully submitted.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="contained" 
              onClick={() => navigate('/jobs')}
            >
              Browse More Jobs
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              View Job Details
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/jobs/${job.id}`)}
              startIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Job
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h1>
            <div className="w-40"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Application Form */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p className="text-gray-600">{job.company} • {job.location}</p>
            </div>

            {/* Resume Upload Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Upload Your Resume (PDF)</h3>
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                {resume ? (
                  <div className="flex flex-col items-center">
                    <FileText className="h-12 w-12 text-blue-500 mb-2" />
                    <p className="font-medium">{resume.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(resume.size / 1024).toFixed(1)} KB
                    </p>
                    <Button 
                      variant="text" 
                      color="primary"
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current.click();
                      }}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="font-medium">Click to upload resume</p>
                    <p className="text-sm text-gray-500 mt-1">PDF files only (max 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* ATS Analysis Section */}
            {resume && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">ATS Resume Checker</h3>
                  {atsScore && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      atsScore >= 80 ? 'bg-green-100 text-green-800' :
                      atsScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Score: {atsScore}/100
                    </span>
                  )}
                </div>

                {isAnalyzing ? (
                  <div className="space-y-2">
                    <LinearProgress />
                    <p className="text-sm text-gray-500">Analyzing your resume for ATS compatibility...</p>
                  </div>
                ) : analysisComplete ? (
                  <div>
                    {atsScore >= 80 ? (
                      <Alert severity="success" className="mb-4">
                        <AlertTitle>Strong Match</AlertTitle>
                        Your resume is well-optimized for ATS systems. Good job!
                      </Alert>
                    ) : atsScore >= 60 ? (
                      <Alert severity="warning" className="mb-4">
                        <AlertTitle>Moderate Match</AlertTitle>
                        Your resume could be improved for better ATS compatibility.
                      </Alert>
                    ) : (
                      <Alert severity="error" className="mb-4">
                        <AlertTitle>Weak Match</AlertTitle>
                        Your resume needs significant improvements for ATS systems.
                      </Alert>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Include keywords from the job description</li>
                        <li>Use standard section headings (Experience, Education, etc.)</li>
                        <li>Avoid graphics, tables, and complex formatting</li>
                        <li>Use bullet points instead of paragraphs</li>
                        <li>Include relevant skills and certifications</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outlined" 
                    onClick={analyzeResume}
                    startIcon={<FileText className="h-4 w-4" />}
                  >
                    Check ATS Score
                  </Button>
                )}
              </div>
            )}

            {/* Submit Section */}
            <div className="pt-4 border-t border-gray-200">
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                disabled={!resume || !analysisComplete}
                onClick={submitApplication}
              >
                Submit Application
              </Button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                By applying, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}