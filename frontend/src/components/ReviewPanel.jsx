import { useState } from "react";
import { usePendingApplications, useReviewApplication, ApplicationStatusEnum } from "../hooks/useReviews";
import ApplicationDetails from "./ApplicationDetails";

const ReviewPanel = () => {
  const { data: pendingApplications, isLoading: isLoadingPending } = usePendingApplications();
  const { mutate: reviewApplication } = useReviewApplication();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleUpdateStatus = (id, status) => {
    reviewApplication({ id, status });
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
  };

  return (
    <div className="container mt-4">
      <h3>Pending Applications</h3>
      {isLoadingPending ? (
        <p>Loading pending applications...</p>
      ) : (
        <table className="table p-3 border rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Abstract</th>
              <th>View</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications?.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.title}</td>
                <td>{app.abstract}</td>
                <td>
                  <button onClick={() => handleViewDetails(app)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-circle-fill" viewBox="0 0 16 16">
                      <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"/>
                    </svg>
                  </button>
                </td>
                <td>
                  <button onClick={() => handleUpdateStatus(app.id, ApplicationStatusEnum.APPROVED)}>Approve</button>
                  <button onClick={() => handleUpdateStatus(app.id, ApplicationStatusEnum.REJECTED)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ApplicationDetails show={showDetails} handleClose={handleCloseDetails} application={selectedApplication} />
    </div>
  );
};

export default ReviewPanel;