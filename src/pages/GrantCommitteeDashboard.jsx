import ApplicationList from "../components/ApplicationList";
import { useReviewedApplications } from "../hooks/useReviews";
import ReviewPanel from "../components/ReviewPanel";

const GrantCommitteeDashboard = () => {

  return (
    <div>  
        <h2>Grant Committee Dashboard</h2>
        <ReviewPanel />
        <ApplicationList applicationLoader={useReviewedApplications} title={"Reviewed Applications"}/>
    </div>
   
  );
};

export default GrantCommitteeDashboard;
