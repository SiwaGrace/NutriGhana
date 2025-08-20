import React, { useState, useEffect } from "react";
import axios from "axios";

import StreakIcon from "../assets/logo&icons/vector.svg";
import fire from "../assets/logo&icons/Vector (1).svg";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState({});
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
        alert("Profile updated!");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Please try again.");
    }
  };

  if (loading) return null; // remove "Loading profile..."
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Goals</h2>
      <div className="bg-white p-4 rounded-2xl space-y-4 text-black">
        <CollapsibleSection
          icon={StreakIcon}
          title="Weight Goal"
          value={profile.currentWeightGoal}
          field="currentWeightGoal"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
        />
        <CollapsibleSection
          icon={fire}
          title="Current Weight"
          value={profile.currentWeight}
          field="currentWeight"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
        />
        <CollapsibleSection
          icon={StreakIcon}
          title="Activity Level"
          value={profile.activityLevel}
          field="activityLevel"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
        />
        <CollapsibleSection
          icon={StreakIcon}
          title="Dietary Goal"
          value={profile.dietaryGoal}
          field="dietaryGoal"
          editing={editing}
          onEdit={handleEdit}
          onSave={handleSave}
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
}) => {
  const isEditing = editing[field] !== undefined;

  return (
    <div className="collapse collapse-arrow border-b border-gray-300 border-opacity-50">
      <input type="radio" name={`accordion-${field}`} />
      <div className="collapse-title font-semibold flex gap-3 items-center">
        <img src={icon} alt={`${title} Icon`} />
        {title}
      </div>
      <div className="collapse-content text-sm">
        {isEditing ? (
          <>
            <input
              type="text"
              className="border-2 rounded-lg px-3 py-2 mr-2"
              value={editing[field]}
              onChange={(e) => onEdit(field, e.target.value)}
            />
            <button
              className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold"
              onClick={() => onSave(field)}
            >
              Save
            </button>
          </>
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
