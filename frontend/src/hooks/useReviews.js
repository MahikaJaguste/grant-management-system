import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchCommitteeNotifications, reviewApplication } from "../api/reviewService";
import { fetchApplications } from "../api/applicationService";

export const ApplicationStatusEnum = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
};

export const usePendingApplications = () => {
  return useQuery("applications", () => fetchApplications({ status: [ApplicationStatusEnum.PENDING] }));
};

export const useReviewedApplications = () => {
  return useQuery("reviewedApplications", () => fetchApplications({ status: [ApplicationStatusEnum.APPROVED, ApplicationStatusEnum.REJECTED] }));
};

export const useReviewApplication = () => {
  const queryClient = useQueryClient();
  return useMutation(reviewApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries("applications");
      queryClient.invalidateQueries("reviewedApplications");
    },
  });
};

export const useCommitteeNotifications = () => {
  return useQuery("committeeNotifications", fetchCommitteeNotifications);
};
