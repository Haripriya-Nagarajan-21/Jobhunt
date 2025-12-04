import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Upload,
  Trash2,
  Plus,
  Edit3,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  FileText,
  UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-context";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const stored = JSON.parse(localStorage.getItem("profile")) || {};

  // -------------------- PROFILE FIELDS --------------------
  const [fullName, setFullName] = useState(user?.name || stored.fullName || "");
  const [email, setEmail] = useState(user?.email || stored.email || "");
  const [headline, setHeadline] = useState(stored.headline || "Frontend Developer | React | UI/UX");
  const [location, setLocation] = useState(stored.location || "India");
  const [phone, setPhone] = useState(stored.phone || "");
  const [bio, setBio] = useState(
    stored.bio || "Passionate frontend developer skilled in React, UI design, and responsive web apps."
  );

  const [skills, setSkills] = useState(stored.skills || ["React", "JavaScript", "UI/UX", "Tailwind"]);
  const [newSkill, setNewSkill] = useState("");

  const [resume, setResume] = useState(stored.resume || null);
  const [avatarBase64, setAvatarBase64] = useState(stored.avatarBase64 || null);

  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [editOpen, setEditOpen] = useState(false);

  // -------------------- SAVE TO LOCAL STORAGE --------------------
  useEffect(() => {
    localStorage.setItem(
      "profile",
      JSON.stringify({
        fullName,
        email,
        headline,
        location,
        phone,
        bio,
        skills,
        resume,
        avatarBase64,
      })
    );
  }, [fullName, email, headline, location, phone, bio, skills, resume, avatarBase64]);

  // -------------------- HANDLERS --------------------

  // Resume Upload
  const uploadResume = (e) => {
    const file = e.target.files?.[0];
    if (file) setResume(file.name);
  };

  const deleteResume = () => setResume(null);

  // Avatar Upload
  const uploadAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatarBase64(reader.result);
    reader.readAsDataURL(file);
  };

  // Add Skill
  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill !== "" && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setNewSkill("");
  };

  // Remove Skill
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("profile");
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <ArrowLeft
              size={18}
              className="cursor-pointer text-indigo-600"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-semibold text-indigo-700">JobHunt</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">
              Signed in as <b>{fullName}</b>
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= BANNER ================= */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-indigo-400 to-purple-500" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="relative -mt-12 flex items-center gap-5">

            {/* Avatar */}
            <div className="relative">
              {avatarBase64 ? (
                <img
                  src={avatarBase64}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <UserCircle2 className="w-28 h-28 text-white" />
              )}

              <button
                onClick={() => avatarInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow"
              >
                <Camera size={16} className="text-indigo-600" />
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadAvatar}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-gray-600">{headline}</p>
              <p className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPin size={16} /> {location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* PERSONAL INFO CARD */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{fullName}</h3>
                <p className="text-gray-600">{headline}</p>

                <div className="mt-3 text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} /> {location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} /> {email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} /> {phone || "No phone added"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Edit3 size={16} /> Edit
              </button>
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-900">About</h3>
              <button onClick={() => setEditOpen(true)} className="text-indigo-600 text-sm">
                Edit
              </button>
            </div>
            <p className="text-gray-700 mt-3">{bio}</p>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>

            <div className="flex gap-3 mb-4">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add skill"
                className="border px-3 py-2 rounded-md flex-1"
              />

              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              {skills.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition"
                >
                  {s}
                  <Trash2
                    size={14}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => removeSkill(s)}
                  />
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* PROFILE STATS */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Profile Stats</h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-gray-50 shadow hover:shadow-md transition">
                <p className="text-gray-500 text-sm">Applied</p>
                <p className="text-2xl font-bold text-indigo-600">12</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 shadow hover:shadow-md transition">
                <p className="text-gray-500 text-sm">Saved</p>
                <p className="text-2xl font-bold text-indigo-600">8</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 shadow hover:shadow-md transition">
                <p className="text-gray-500 text-sm">Views</p>
                <p className="text-2xl font-bold text-indigo-600">27</p>
              </div>
            </div>
          </div>

          {/* RESUME */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Resume</h3>

            {resume ? (
              <>
                <p className="text-gray-700 flex items-center gap-2">
                  <FileText size={16} /> {resume}
                </p>

                <button
                  onClick={deleteResume}
                  className="mt-3 px-3 py-1.5 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200"
                >
                  Delete Resume
                </button>
              </>
            ) : (
              <p className="text-gray-600">No resume uploaded</p>
            )}

            <button
              onClick={() => resumeInputRef.current.click()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2"
            >
              <Upload size={16} /> Upload
            </button>

            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={uploadResume}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">

            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            <div className="grid grid-cols-1 gap-3">
              <input
                className="border px-3 py-2 rounded-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                className="border px-3 py-2 rounded-md"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Headline"
              />
              <input
                className="border px-3 py-2 rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
              <input
                className="border px-3 py-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="border px-3 py-2 rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
              <textarea
                className="border px-3 py-2 rounded-md"
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="About"
              />
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
