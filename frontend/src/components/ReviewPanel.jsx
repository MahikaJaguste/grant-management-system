import { usePendingApplications, useReviewApplication, ApplicationStatusEnum } from "../hooks/useReviews";


const ApplicationList = ({ applicationLoader }) => {

    const { data: pendingApplications, isLoading: isLoadingPending } = usePendingApplications();
    const { mutate: reviewApplication } = useReviewApplication();
  
    const handleUpdateStatus = (id, status) => {
      reviewApplication({ id, status });
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
              <th>Description</th>
              <th>Fund Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications?.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.title}</td>
                <td>{app.description}</td>
                <td>{app.fund_requested}</td>
                <td>
                  <button onClick={() => handleUpdateStatus(app.id, ApplicationStatusEnum.APPROVED)}>Approve</button>
                  <button onClick={() => handleUpdateStatus(app.id, ApplicationStatusEnum.REJECTED)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    );
};

export default ApplicationList;