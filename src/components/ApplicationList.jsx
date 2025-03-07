import { useState } from "react";
import ApplicationDetails from "./ApplicationDetails";
import { useApplications } from "../hooks/useApplications";

const ApplicationList = ({ applicationLoader, title }) => {
  const { data: applications, isLoading } = applicationLoader();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
  };

  if (isLoading) return <p>Loading applications...</p>;

  return (
    <div className="container mt-4">
      <h3>{title}</h3>
      <table className="table p-3 border rounded">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Abstract</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {applications && applications?.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.title}</td>
              <td>{app.abstract}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleViewDetails(app)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-circle-fill" viewBox="0 0 16 16">
                      <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"/>
                    </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ApplicationDetails show={showDetails} handleClose={handleCloseDetails} application={selectedApplication} />
    </div>
  );
};

export default ApplicationList;