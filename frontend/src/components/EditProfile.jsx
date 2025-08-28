import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import StreakIcon from "../assets/logo&icons/vector.svg";
import fire from "../assets/logo&icons/Vector (1).svg";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState({});
  const [openSection, setOpenSection] = useState(""); // add openSection state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch user profile using JWT
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/auth/user-profile`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setProfile(data.user);
        } else {
          setError(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Server error while fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [backendUrl]);

  // Start editing a field
  const handleEdit = (field, value) => {
    setEditing({ ...editing, [field]: value });
  };

  // Save the edited field
  const handleSave = async (field) => {
    const value = editing[field];
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/create-profile`,
        { [field]: value },
        { withCredentials: true }
      );

      if (data.success) {
        setProfile((prev) => ({ ...prev, [field]: data.user[field] || value }));
        setEditing((prev) => {
          const newEdit = { ...prev };
          delete newEdit[field];
          return newEdit;
        });
        toast.success("Profile updated!");
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  if (loading) return null; // remove "Loading profile..."
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl font-bold text-gray-800 "> Goals</h2>
      <div className="bg-white p-4 rounded-2xl space-y-4 text-black">
        <CollapsibleSection
          icon={StreakIcon}
          title="Weight Goal"
          value={profile.currentWeightGoal}
          field="currentWeightGoal"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <CollapsibleSection
          icon={fire}
          title="Current Weight"
          value={profile.currentWeight}
          field="currentWeight"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <CollapsibleSection
          icon={StreakIcon}
          title="Activity Level"
          value={profile.activityLevel}
          field="activityLevel"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
        <CollapsibleSection
          icon={StreakIcon}
          title="Dietary Goal"
          value={profile.dietaryGoal}
          field="dietaryGoal"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
      </div>
    </div>
  );
};

const CollapsibleSection = ({
  icon,
  title,
  value,
  field,
  editing,
  onEdit,
  onSave,
  openSection,
  setOpenSection,
}) => {
  const isEditing = editing[field] !== undefined;
  const isOpen = openSection === field;

  return (
    <div
      className={`collapse collapse-arrow border-b rounded-none border-gray-300 border-opacity-50 ${
        isOpen ? "collapse-open" : ""
      }`}
    >
      <div
        className="collapse-title font-semibold flex gap-3 items-center cursor-pointer"
        onClick={() => setOpenSection(isOpen ? "" : field)}
      >
        <img src={icon} alt={`${title} Icon`} />
        {title}
      </div>
      <div
        className={`collapse-content text-sm ${isOpen ? "block" : "hidden"}`}
      >
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="border border-yellow-400 rounded-lg px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              value={editing[field]}
              onChange={(e) => onEdit(field, e.target.value)}
            />
            <button
              className="bg-yellow-500 px-5 py-2 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
              onClick={() => onSave(field)}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>{value || "Not set"}</span>
            <button
              className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold"
              onClick={() => onEdit(field, value)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
