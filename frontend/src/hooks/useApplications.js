import { useQuery, useQueryClient, useMutation } from "react-query";
import { submitApplication, fetchApplications, fetchProfessorNotifications } from "../api/applicationService";


export const useApplications = () => {
    return useQuery("applications", () => fetchApplications({ status: [] }));
};

export const useSubmitApplication = () => {
    const queryClient = useQueryClient();
    return useMutation(submitApplication, {
        onSuccess: () => {
        queryClient.invalidateQueries("applications");
        },
    });
};

export const useProfessorNotifications = () => {
  return useQuery("professorNotifications", fetchProfessorNotifications);
};
