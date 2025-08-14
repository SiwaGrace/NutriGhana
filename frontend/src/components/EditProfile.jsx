import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import StreakIcon from "../assets/logo&icons/vector.svg";
import fire from "../assets/logo&icons/Vector (1).svg";

const EditProfile = () => {
  const { id } = useParams(); // Get ID from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState({});

  // Fetch profile by ID
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/profile/${id}`
        );
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  // Start editing a field
  const handleEdit = (field, value) => {
    setEditing({ ...editing, [field]: value });
  };

  // Save the edited field
  const handleSave = async (field) => {
    const value = editing[field];
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/profile/${id}`,
        { [field]: value }
      );
      setProfile({ ...profile, [field]: value });
      setEditing((prev) => {
        const newEdit = { ...prev };
        delete newEdit[field];
        return newEdit;
      });
      alert("Updated!");
    } catch (error) {
      alert("Update failed.");
      console.error(error);
    }
  };

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
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
