import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilesList = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/profile/${id}`
        );
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch profile .");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <div className="border rounded-lg p-4 shadow-sm">
        <p>
          <span className="font-semibold">ID:</span> {profile._id}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {profile.gender}
        </p>
        <p>
          <span className="font-semibold">Year of Birth:</span>{" "}
          {profile.yearOfBirth}
        </p>
        <p>
          <span className="font-semibold">Height:</span> {profile.height}
        </p>
        <p>
          <span className="font-semibold">Weight:</span> {profile.weight}
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
