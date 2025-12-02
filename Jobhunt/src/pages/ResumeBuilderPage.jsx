import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Download, FileText, ArrowLeft, User, Briefcase, GraduationCap, Mail, Phone, Globe, Image as ImageIcon } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function ResumeBuilderPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [imageForPDF, setImageForPDF] = useState(null);
  const imageInputRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      linkedin: ''
    },
    summary: '',
    skills: [],
    experience: [
      {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        period: '',
        description: ['']
      }
    ],
    education: [
      {
        id: Date.now(),
        degree: '',
        institution: '',
        location: '',
        year: ''
      }
    ],
    projects: [
      {
        id: Date.now(),
        name: '',
        description: '',
        technologies: ''
      }
    ],
    certifications: ['']
  });

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const maxSize = 100; // pixels
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          height *= maxSize / width;
          width = maxSize;
        } else {
          width *= maxSize / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        setProfileImage(event.target.result);
        setImageForPDF(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle input changes
  const handleInputChange = (e, section, field, index) => {
    if (index !== undefined) {
      // Handle array fields (experience, education, projects)
      const updatedArray = [...resumeData[section]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: e.target.value
      };
      setResumeData({
        ...resumeData,
        [section]: updatedArray
      });
    } else if (field) {
      // Handle nested objects (personalInfo)
      setResumeData({
        ...resumeData,
        [section]: {
          ...resumeData[section],
          [field]: e.target.value
        }
      });
    } else {
      // Handle direct fields (summary)
      setResumeData({
        ...resumeData,
        [section]: e.target.value
      });
    }
  };

  // Add new item to array sections
  const addItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...(section === 'experience' ? {
        title: '',
        company: '',
        location: '',
        period: '',
        description: ['']
      } : section === 'education' ? {
        degree: '',
        institution: '',
        location: '',
        year: ''
      } : section === 'projects' ? {
        name: '',
        description: '',
        technologies: ''
      } : {})
    };
    
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem]
    });
  };

  // Remove item from array sections
  const removeItem = (section, index) => {
    const updatedArray = [...resumeData[section]];
    updatedArray.splice(index, 1);
    setResumeData({
      ...resumeData,
      [section]: updatedArray
    });
  };

  // Add new skill
  const addSkill = () => {
    const input = document.getElementById('newSkill');
    if (input.value && !resumeData.skills.includes(input.value)) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, input.value]
      });
      input.value = '';
    }
  };

  // Remove skill
  const removeSkill = (index) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: updatedSkills
    });
  };

  // Generate and download PDF
  const downloadResume = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Add profile image if exists
    if (imageForPDF) {
      try {
        doc.addImage(imageForPDF, 'JPEG', 160, 15, 30, 30);
      } catch (error) {
        console.error('Error adding image to PDF:', error);
      }
    }

    // Header with name
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.personalInfo.name || 'Your Name', 105, yPosition, { align: 'center' });
    yPosition += 10;

    // Contact information
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contactInfo = [
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.address,
      resumeData.personalInfo.website,
      resumeData.personalInfo.linkedin
    ].filter(Boolean).join(' | ');
    
    if (contactInfo) {
      doc.text(contactInfo, 105, yPosition, { align: 'center' });
      yPosition += 10;
    }

    // Summary
    if (resumeData.summary) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', 14, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const splitSummary = doc.splitTextToSize(resumeData.summary, 180);
      doc.text(splitSummary, 14, yPosition);
      yPosition += splitSummary.length * 5 + 5;
    }

    // Skills
    if (resumeData.skills.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', 14, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(resumeData.skills.join(', '), 14, yPosition);
      yPosition += 10;
    }

    // Experience
    if (resumeData.experience.some(exp => exp.title || exp.company)) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', 14, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      resumeData.experience.forEach(exp => {
        if (exp.title || exp.company) {
          // Position and company
          doc.setFont('helvetica', 'bold');
          doc.text(`${exp.title || ''}`, 14, yPosition);
          if (exp.company) {
            doc.text(`${exp.company}${exp.location ? `, ${exp.location}` : ''}`, 14, yPosition + 5);
          }
          doc.setFont('helvetica', 'normal');
          
          // Period
          if (exp.period) {
            doc.text(exp.period, 180, yPosition, { align: 'right' });
          }
          yPosition += 10;
          
          // Description
          if (exp.description[0]) {
            const splitDesc = doc.splitTextToSize(exp.description[0], 180);
            doc.text(splitDesc, 14, yPosition);
            yPosition += splitDesc.length * 5 + 5;
          } else {
            yPosition += 5;
          }
        }
      });
    }

    // Education
    if (resumeData.education.some(edu => edu.degree || edu.institution)) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', 14, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      resumeData.education.forEach(edu => {
        if (edu.degree || edu.institution) {
          // Degree and institution
          doc.setFont('helvetica', 'bold');
          doc.text(`${edu.degree || ''}`, 14, yPosition);
          if (edu.institution) {
            doc.text(`${edu.institution}${edu.location ? `, ${edu.location}` : ''}`, 14, yPosition + 5);
          }
          doc.setFont('helvetica', 'normal');
          
          // Year
          if (edu.year) {
            doc.text(edu.year, 180, yPosition, { align: 'right' });
          }
          yPosition += 10;
        }
      });
    }

    // Projects
    if (resumeData.projects.some(proj => proj.name)) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROJECTS', 14, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      resumeData.projects.forEach(proj => {
        if (proj.name) {
          // Project name
          doc.setFont('helvetica', 'bold');
          doc.text(proj.name, 14, yPosition);
          doc.setFont('helvetica', 'normal');
          yPosition += 5;
          
          // Description
          if (proj.description) {
            const splitDesc = doc.splitTextToSize(proj.description, 180);
            doc.text(splitDesc, 14, yPosition);
            yPosition += splitDesc.length * 5 + 2;
          }
          
          // Technologies
          if (proj.technologies) {
            doc.text(`Technologies: ${proj.technologies}`, 14, yPosition);
            yPosition += 5;
          }
          
          yPosition += 5;
        }
      });
    }

    // Certifications
    if (resumeData.certifications.some(cert => cert)) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICATIONS', 14, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      resumeData.certifications.forEach(cert => {
        if (cert) {
          doc.text(`• ${cert}`, 14, yPosition);
          yPosition += 5;
        }
      });
    }

    doc.save(`${resumeData.personalInfo.name.replace(' ', '_') || 'resume'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="mr-4 text-blue-600 hover:text-blue-800 flex items-center"
            >
              <ArrowLeft size={20} className="mr-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold flex items-center">
              <FileText className="mr-2" /> Resume Builder
            </h1>
          </div>
        </div>

        <div className="md:flex">
          {/* Form Section */}
          <div className="md:w-1/2 p-6 border-r overflow-y-auto max-h-screen">
            <div className="space-y-6">
              {/* Profile Image Upload */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <ImageIcon className="mr-2" size={18} /> Profile Photo
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center">
                        <ImageIcon className="text-gray-400" size={24} />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <button
                    onClick={() => imageInputRef.current.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {profileImage ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {profileImage && (
                    <button
                      onClick={() => {
                        setProfileImage(null);
                        setImageForPDF(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">Recommended: Square image, 200x200 pixels</p>
              </div>

              {/* Personal Information */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <User className="mr-2" size={18} /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => handleInputChange(e, 'personalInfo', 'name')}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handleInputChange(e, 'personalInfo', 'email')}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => handleInputChange(e, 'personalInfo', 'phone')}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.address}
                      onChange={(e) => handleInputChange(e, 'personalInfo', 'address')}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website/Portfolio</label>
                    <input
                      type="url"
                      value={resumeData.personalInfo.website}
                      onChange={(e) => handleInputChange(e, 'personalInfo', 'website')}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => handleInputChange(e, 'personalInfo', 'linkedin')}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <h3 className="font-semibold">Professional Summary</h3>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => handleInputChange(e, 'summary')}
                  className="w-full p-2 border rounded-lg h-32"
                  placeholder="Briefly describe your professional background, key skills, and career objectives..."
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      <button 
                        onClick={() => removeSkill(index)}
                        className="ml-1 text-blue-600 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    id="newSkill"
                    type="text"
                    className="flex-1 p-2 border rounded-l-lg"
                    placeholder="Add skill (e.g., JavaScript, Project Management)"
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold flex items-center">
                    <Briefcase className="mr-2" size={18} /> Work Experience
                  </h3>
                  <button
                    onClick={() => addItem('experience')}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    + Add Experience
                  </button>
                </div>
                
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="space-y-2 p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Experience #{index + 1}</h4>
                      {resumeData.experience.length > 1 && (
                        <button
                          onClick={() => removeItem('experience', index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleInputChange(e, 'experience', 'title', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Senior Developer"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleInputChange(e, 'experience', 'company', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Google Inc."
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleInputChange(e, 'experience', 'location', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., San Francisco, CA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Period*</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => handleInputChange(e, 'experience', 'period', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Jan 2020 - Present"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                      <textarea
                        value={exp.description[0]}
                        onChange={(e) => handleInputChange(e, 'experience', 'description', index)}
                        className="w-full p-2 border rounded-lg"
                        rows="3"
                        placeholder="Describe your responsibilities and achievements..."
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold flex items-center">
                    <GraduationCap className="mr-2" size={18} /> Education
                  </h3>
                  <button
                    onClick={() => addItem('education')}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    + Add Education
                  </button>
                </div>
                
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="space-y-2 p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Education #{index + 1}</h4>
                      {resumeData.education.length > 1 && (
                        <button
                          onClick={() => removeItem('education', index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree*</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleInputChange(e, 'education', 'degree', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Bachelor of Science in Computer Science"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution*</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleInputChange(e, 'education', 'institution', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Stanford University"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleInputChange(e, 'education', 'location', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Stanford, CA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year*</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleInputChange(e, 'education', 'year', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., 2015 - 2019"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Projects</h3>
                  <button
                    onClick={() => addItem('projects')}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    + Add Project
                  </button>
                </div>
                
                {resumeData.projects.map((proj, index) => (
                  <div key={proj.id} className="space-y-2 p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Project #{index + 1}</h4>
                      {resumeData.projects.length > 1 && (
                        <button
                          onClick={() => removeItem('projects', index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Name*</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleInputChange(e, 'projects', 'name', index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="e.g., E-commerce Website"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleInputChange(e, 'projects', 'description', index)}
                        className="w-full p-2 border rounded-lg"
                        rows="2"
                        placeholder="Describe the project and your role..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) => handleInputChange(e, 'projects', 'technologies', index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="e.g., React, Node.js, MongoDB"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Certifications</h3>
                  <button
                    onClick={() => setResumeData({...resumeData, certifications: [...resumeData.certifications, '']})}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    + Add Certification
                  </button>
                </div>
                
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => {
                        const updatedCerts = [...resumeData.certifications];
                        updatedCerts[index] = e.target.value;
                        setResumeData({...resumeData, certifications: updatedCerts});
                      }}
                      className="flex-1 p-2 border rounded-lg"
                      placeholder="e.g., AWS Certified Solutions Architect"
                    />
                    {resumeData.certifications.length > 1 && (
                      <button
                        onClick={() => {
                          const updatedCerts = [...resumeData.certifications];
                          updatedCerts.splice(index, 1);
                          setResumeData({...resumeData, certifications: updatedCerts});
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="md:w-1/2 p-6 bg-gray-50 overflow-y-auto max-h-screen">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              {/* Header with Image */}
              <div className="flex items-start mb-6">
                {profileImage && (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 mr-4"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || 'Your Name'}</h1>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    {resumeData.personalInfo.email && (
                      <div className="flex items-center">
                        <Mail className="mr-1" size={14} /> {resumeData.personalInfo.email}
                      </div>
                    )}
                    {resumeData.personalInfo.phone && (
                      <div className="flex items-center">
                        <Phone className="mr-1" size={14} /> {resumeData.personalInfo.phone}
                      </div>
                    )}
                    {resumeData.personalInfo.address && (
                      <div className="flex items-center">
                        {resumeData.personalInfo.address}
                      </div>
                    )}
                    {resumeData.personalInfo.website && (
                      <div className="flex items-center">
                        <Globe className="mr-1" size={14} /> {resumeData.personalInfo.website}
                      </div>
                    )}
                    {resumeData.personalInfo.linkedin && (
                      <div className="flex items-center">
                        <Globe className="mr-1" size={14} /> {resumeData.personalInfo.linkedin}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
                  <p className="text-gray-700 whitespace-pre-line">{resumeData.summary}</p>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>
                  {resumeData.experience.map((exp, index) => (
                    (exp.title || exp.company) && (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {exp.title && <span>{exp.title}</span>}
                            {exp.company && <span>{exp.title && exp.company ? ' at ' : ''}{exp.company}</span>}
                            {exp.location && <span>, {exp.location}</span>}
                          </h3>
                          {exp.period && <span className="text-sm text-gray-600">{exp.period}</span>}
                        </div>
                        {exp.description[0] && (
                          <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{exp.description[0]}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Education */}
              {resumeData.education.some(edu => edu.degree || edu.institution) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
                  {resumeData.education.map((edu, index) => (
                    (edu.degree || edu.institution) && (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {edu.degree && <span>{edu.degree}</span>}
                            {edu.institution && <span>{edu.degree && edu.institution ? ' at ' : ''}{edu.institution}</span>}
                            {edu.location && <span>, {edu.location}</span>}
                          </h3>
                          {edu.year && <span className="text-sm text-gray-600">{edu.year}</span>}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Projects */}
              {resumeData.projects.some(proj => proj.name) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Projects</h2>
                  {resumeData.projects.map((proj, index) => (
                    proj.name && (
                      <div key={index} className="mb-4">
                        <h3 className="font-medium">{proj.name}</h3>
                        {proj.description && (
                          <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{proj.description}</p>
                        )}
                        {proj.technologies && (
                          <p className="text-gray-500 text-xs mt-1">Technologies: {proj.technologies}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications.some(cert => cert) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Certifications</h2>
                  <ul className="list-disc pl-5">
                    {resumeData.certifications.map((cert, index) => (
                      cert && <li key={index} className="text-gray-700">{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Download Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={downloadResume}
                  className="flex items-center justify-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mx-auto"
                >
                  <Download className="mr-2" size={18} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}