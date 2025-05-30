import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Profiles</h2>

      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <div className="grid gap-4">
          {profiles.map((p, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <p>
                <span className="font-semibold">Gender:</span> {p.gender}
              </p>
              <p>
                <span className="font-semibold">Year of Birth:</span> {p.year}
              </p>
              <p>
                <span className="font-semibold">Height:</span> {p.height}
              </p>
              <p>
                <span className="font-semibold">Weight:</span> {p.weight}
              </p>
              <p>
                <span className="font-semibold">Activity Level:</span>{" "}
                {p.activityLevel}
              </p>
              <p>
                <span className="font-semibold">Dietary Goal:</span>{" "}
                {p.dietaryGoal}
              </p>
              <p>
                <span className="font-semibold">Current Weight:</span>{" "}
                {p.currentWeight}
              </p>
              <p>
                <span className="font-semibold">Weight Goal:</span>{" "}
                {p.currentWeightGoal}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesList;
