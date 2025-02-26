import { useApplications } from "../hooks/useApplications";

const ApplicationList = ({ applicationLoader, title }) => {

    const { data: applications, isLoading } = applicationLoader();

    if (isLoading) return <p>Loading applications...</p>;

    return (
    <div className="container mt-4">
        <h3>{title}</h3>
        <table className="table p-3 border rounded">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Fund Requested</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {applications && applications?.map((app) => (
            <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.title}</td>
                <td>{app.description}</td>
                <td>{app.fund_requested}</td>
                <td>{app.status}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};

export default ApplicationList;