import { useState } from "react";
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Briefcase,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Haripriya Nagarajan");
  const [headline, setHeadline] = useState("Frontend Developer | React | UI/UX");
  const [location, setLocation] = useState("Coimbatore, India");
  const [email, setEmail] = useState("haripriya@gmail.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [bio, setBio] = useState(
    "Passionate frontend developer skilled in React, UI design, and responsive web apps."
  );

  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState([
    "React",
    "JavaScript",
    "UI/UX",
    "Tailwind CSS",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const handleResumeUpload = (e) => {
    if (e.target.files[0]) setResume(e.target.files[0].name);
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ----------- TOP GRADIENT BANNER ----------- */}
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
        {/* PROFILE IMAGE */}
        <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />

            <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow">
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 px-4 flex flex-col lg:flex-row gap-6">

        {/* =================== LEFT MAIN CONTENT =================== */}
        <div className="flex-1 space-y-6">

          {/* ---------- PROFILE HEADER CARD ---------- */}
          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
            <p className="text-lg text-gray-600 mt-1">{headline}</p>

            <div className="flex items-center gap-3 text-gray-500 mt-3">
              <MapPin size={18} /> {location}
            </div>

            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700">
              <Edit3 size={18} /> Edit Profile
            </button>
          </div>

          {/* ---------- ABOUT SECTION ---------- */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700"
              rows="4"
            />
          </div>

          {/* ---------- PERSONAL INFO ---------- */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3 items-center text-gray-700">
                <Mail /> {email}
              </div>

              <div className="flex gap-3 items-center text-gray-700">
                <Phone /> {phone}
              </div>

              <div className="flex gap-3 items-center text-gray-700">
                <MapPin /> {location}
              </div>
            </div>
          </div>

          {/* ---------- RESUME UPLOAD ---------- */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resume</h2>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <p className="text-gray-600">
                {resume ? resume : "No resume uploaded"}
              </p>

              <label className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 flex items-center gap-2">
                <Upload size={18} /> Upload
                <input type="file" className="hidden" onChange={handleResumeUpload} />
              </label>
            </div>
          </div>

          {/* ---------- SKILLS SECTION ---------- */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>

            <div className="flex flex-wrap gap-3 mb-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full gap-2 shadow-sm"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)}>
                    <Trash2 size={14} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 border rounded-lg p-3"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skill..."
              />
              <button
                onClick={addSkill}
                className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* =================== RIGHT SIDEBAR =================== */}
        <div className="w-full lg:w-80 space-y-6">

          {/* PROFILE STATS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Profile Stats
            </h3>

            <div className="space-y-3">
              <p className="flex justify-between">
                <span>Applied Jobs</span> <strong>12</strong>
              </p>

              <p className="flex justify-between">
                <span>Saved Jobs</span> <strong>8</strong>
              </p>

              <p className="flex justify-between">
                <span>Profile Views</span> <strong>27</strong>
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-indigo-600">
              <li className="cursor-pointer hover:underline">Edit Profile</li>
              <li className="cursor-pointer hover:underline">Settings</li>
              <li className="cursor-pointer hover:underline text-red-500">
                Logout
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
