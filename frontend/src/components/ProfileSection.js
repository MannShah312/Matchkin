import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileSection = ({ role }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const commonFields = {
    client: ["company", "website", "description"],
    consultant: ["skills", "domain", "experience", "bio", "availability"]
  };

  const fieldLabels = {
    company: "Company",
    website: "Website",
    description: "Description",
    skills: "Skills (comma-separated)",
    domain: "Domain",
    experience: "Experience (years)",
    bio: "Bio",
    availability: "Availability"
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = role === "consultant" ? "/consultants/profile/me" : `/${role}/profile`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = res.data.profile || res.data;
        if (data.skills) data.skills = data.skills.join(", ");
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [role]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...profile };
      if (payload.skills) {
        payload.skills = payload.skills.split(",").map((s) => s.trim());
      }
      const res = await axios.post(`/${role}/profile`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert(res.data.message);
    } catch (err) {
      alert(err?.response?.data?.error || "Error saving profile");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{role.charAt(0).toUpperCase() + role.slice(1)} Profile</h2>
      <div className="space-y-4">
        {commonFields[role].map((field) => (
          <div key={field}>
            {field === "description" || field === "bio" ? (
              <textarea
                className="w-full p-2 border rounded"
                placeholder={fieldLabels[field]}
                value={profile[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            ) : (
              <input
                className="w-full p-2 border rounded"
                placeholder={fieldLabels[field]}
                value={profile[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;