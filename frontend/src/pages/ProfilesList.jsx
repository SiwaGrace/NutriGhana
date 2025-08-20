import React, { useEffect, useState } from "react";

const ProfilesList = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(backendUrl + "/api/auth/user-profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json(); // FIXED: was "res.json()"
        if (data.success) {
          setProfile(data.user);
        } else {
          setError(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Server error while fetching profile");
      }
    }

    fetchUserData();
  }, [backendUrl]);

  // No loading text anymore — just empty until data arrives
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!profile) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <div className="border rounded-lg p-4 shadow-sm">
        <p>
          <span className="font-semibold">Year of Birth:</span>{" "}
          {profile.yearOfBirth || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Height:</span> {profile.height}
        </p>
        <p>
          <span className="font-semibold">Weight:</span>{" "}
          {profile.weight || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Activity Level:</span>{" "}
          {profile.activityLevel}
        </p>
        <p>
          <span className="font-semibold">Dietary Goal:</span>{" "}
          {profile.dietaryGoal}
        </p>
        <p>
          <span className="font-semibold">Current Weight:</span>{" "}
          {profile.currentWeight}
        </p>
        <p>
          <span className="font-semibold">Weight Goal:</span>{" "}
          {profile.currentWeightGoal}
        </p>
      </div>
    </div>
  );
};

export default ProfilesList;
