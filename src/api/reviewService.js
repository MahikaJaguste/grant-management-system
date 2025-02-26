import axiosInstance from './axiosConfig';

export const reviewApplication = async ({ id, status }) => {
  const response = await axiosInstance.post(`/grants/review/${id}`, { status });
  return response?.data;
};
