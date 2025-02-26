import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";
import { useApplications } from "../hooks/useApplications";

const ProfessorDashboard = () => {
  return (
    <div> 
      <h2>Professor Dashboard</h2>
      <ApplicationForm />
      <ApplicationList applicationLoader={useApplications} title={"My Applications"} />
    </div>
  );
};
export default ProfessorDashboard;