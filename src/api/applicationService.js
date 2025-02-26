import axiosInstance from './axiosConfig';

export const fetchApplications = async (filters) => {
    const response = await axiosInstance.get("/grants/list", { params: filters });
    return response?.data?.grants;
  };

export const submitApplication = async (applicationData) => {
  const response = await axiosInstance.post("/grants/submit", applicationData);
  return response?.data;
};