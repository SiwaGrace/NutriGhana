import React, { useState, useEffect } from "react";
import axios from "axios";
import StreakIcon from "../assets/logo&icons/vector.svg";
import fire from "../assets/logo&icons/Vector (1).svg";

const EditProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Track editing state: { [profileId]: { field: value } }
  const [editing, setEditing] = useState({});

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/profile");
        setProfiles(data);
      } catch (err) {
        setError("Failed to fetch profiles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Helper to start editing a field
  const handleEdit = (profileId, field, value) => {
    setEditing({ ...editing, [`${profileId}_${field}`]: value });
  };

  // Helper to save a field
  const handleSave = async (profileId, field) => {
    const value = editing[`${profileId}_${field}`];
    try {
      await axios.put(`http://localhost:5000/api/profile/${profileId}`, {
        [field]: value,
      });
      // Update local state
      setProfiles((prev) =>
        prev.map((p) => (p._id === profileId ? { ...p, [field]: value } : p))
      );
      // Remove editing state
      setEditing((prev) => {
        const newEdit = { ...prev };
        delete newEdit[`${profileId}_${field}`];
        return newEdit;
      });
      alert("Updated!");
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Goals</h2>
      <div className="bg-white p-4 rounded-2xl space-y-4 text-black">
        <div>
          <h2 className="text-2xl font-bold mb-4">All Profiles</h2>
          {loading ? (
            <p>Loading profiles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : profiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            <div className="grid gap-4">
              {profiles.map((p, id) => (
                <div key={id} className="join join-vertical bg-white">
                  {/* Weight Goal */}
                  <div className="collapse collapse-arrow border-b-1 border-gray-300 border-opacity-50">
                    <input
                      type="radio"
                      name={`my-accordion-4-${id}`}
                      defaultChecked
                    />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        <img src={StreakIcon} alt="Weight Goal Icon" />
                        Weight Goal:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {editing[`${p._id}_currentWeightGoal`] !== undefined ? (
                        <>
                          <input
                            type="text"
                            className="border-2 rounded-lg px-3 py-2 mr-2 "
                            value={editing[`${p._id}_currentWeightGoal`]}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                [`${p._id}_currentWeightGoal`]: e.target.value,
                              })
                            }
                          />
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded-lg font-semibold text-white"
                            onClick={() =>
                              handleSave(p._id, "currentWeightGoal")
                            }
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{p.currentWeightGoal}</span>
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white  "
                            onClick={() =>
                              handleEdit(
                                p._id,
                                "currentWeightGoal",
                                p.currentWeightGoal
                              )
                            }
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Current Weight */}
                  <div className="collapse collapse-arrow border-b-1 border-gray-300 border-opacity-50">
                    <input type="radio" name={`my-accordion-4-${id}`} />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        <img src={fire} alt="Current Weight Icon" />
                        Current Weight:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {editing[`${p._id}_currentWeight`] !== undefined ? (
                        <>
                          <input
                            type="text"
                            className="border-2 rounded-lg px-3 py-2 mr-2 "
                            value={editing[`${p._id}_currentWeight`]}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                [`${p._id}_currentWeight`]: e.target.value,
                              })
                            }
                          />
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white"
                            onClick={() => handleSave(p._id, "currentWeight")}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{p.currentWeight}</span>
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white"
                            onClick={() =>
                              handleEdit(
                                p._id,
                                "currentWeight",
                                p.currentWeight
                              )
                            }
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="collapse collapse-arrow border-b-1 border-gray-300 border-opacity-50">
                    <input type="radio" name={`my-accordion-4-${id}`} />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        <img src={StreakIcon} alt="Activity Level Icon" />
                        Activity Level:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {editing[`${p._id}_activityLevel`] !== undefined ? (
                        <>
                          <input
                            type="text"
                            className="border-2 rounded-lg px-3 py-2 mr-2 "
                            value={editing[`${p._id}_activityLevel`]}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                [`${p._id}_activityLevel`]: e.target.value,
                              })
                            }
                          />
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white"
                            onClick={() => handleSave(p._id, "activityLevel")}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{p.activityLevel}</span>
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white"
                            onClick={() =>
                              handleEdit(
                                p._id,
                                "activityLevel",
                                p.activityLevel
                              )
                            }
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dietary Goal */}
                  <div className="collapse collapse-arrow border-b-1 border-gray-300 border-opacity-50">
                    <input type="radio" name={`my-accordion-4-${id}`} />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        <img src={StreakIcon} alt="Dietary Goal Icon" />
                        Dietary Goal:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {editing[`${p._id}_dietaryGoal`] !== undefined ? (
                        <>
                          <input
                            type="text"
                            className="border-2 rounded-lg px-3 py-2 mr-2 "
                            value={editing[`${p._id}_dietaryGoal`]}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                [`${p._id}_dietaryGoal`]: e.target.value,
                              })
                            }
                          />
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white"
                            onClick={() => handleSave(p._id, "dietaryGoal")}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{p.dietaryGoal}</span>
                          <button
                            className="ml-2 bg-yellow-500 px-5 py-2 rounded font-semibold text-white"
                            onClick={() =>
                              handleEdit(p._id, "dietaryGoal", p.dietaryGoal)
                            }
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
