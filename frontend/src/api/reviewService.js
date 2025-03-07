import axiosInstance, {STATIC_FLAG} from './axiosConfig';

const staticReviewerNotifications = [
  { id: 1,  title: "New Grant Application!", description: "New grant application with ID 3 is pending review." },
];

export const reviewApplication = async ({ id, status }) => {
  if (STATIC_FLAG) {
    return { status: "SUCCESS", grant: { id, status } };
  }
  const response = await axiosInstance.post(`/grants/review/${id}`, { status });
  return response?.data;
};

export const fetchCommitteeNotifications = async () => {
  if(STATIC_FLAG) {
    return staticReviewerNotifications.reverse();
  }
  const response = await axiosInstance.get("/notifications/reviewer");
  return response?.data?.notifications;
}