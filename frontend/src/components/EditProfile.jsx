import React, { useState, useEffect } from "react";
import axios from "axios";
import StreakIcon from "../assets/logo&icons/vector.svg";
import fire from "../assets/logo&icons/Vector (1).svg";

const EditProfile = () => {
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

  return (
    <div className=" w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Goals</h2>

      <div className="bg-white p-4 rounded-2xl space-y-4 text-black">
        <div className="">
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
                  <div className="collapse collapse-arrow border-b-1 border-gray-300 border-opacity-50">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        <img src={StreakIcon} alt="" />
                        Weight Goal:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {p.currentWeightGoal}
                    </div>
                  </div>
                  <div className="collapse collapse-arrow   border-b-1 border-gray-300 border-opacity-50">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        {" "}
                        <img src={fire} alt="" />
                        Current Weight:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {p.currentWeight}
                    </div>
                  </div>
                  <div className="collapse collapse-arrow  border-b-1 border-gray-300 border-opacity-50 ">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        {" "}
                        <img src={StreakIcon} alt="" />
                        Activity Level:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {p.activityLevel}
                    </div>
                  </div>
                  <div className="collapse collapse-arrow   border-b-1 border-gray-300 border-opacity-50">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold">
                      <span className="font-semibold flex gap-3">
                        {" "}
                        <img src={StreakIcon} alt="" />
                        Dietary Goal:
                      </span>
                    </div>
                    <div className="collapse-content text-sm">
                      {p.dietaryGoal}
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
