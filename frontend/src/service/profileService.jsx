import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

export const fetchProfiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getprofiles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};
