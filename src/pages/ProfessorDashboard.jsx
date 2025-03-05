import { useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";
import Notifications from "../components/Notifications";
import { useApplications, useProfessorNotifications } from "../hooks/useApplications";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProfessorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("form");
  const tabs = [
    { label: "Application Form", path: "form" },
    { label: "My Applications", path: "applications" },
  ];

  return (
    <div>
      <Header title="Professor Dashboard" tabs={tabs} onTabClick={setSelectedTab} />
      <div className="main-content">
        {selectedTab === "form" && <ApplicationForm />}
        {selectedTab === "applications" && <ApplicationList applicationLoader={useApplications} title={"My Applications"} />}
        <Notifications notificationLoader={useProfessorNotifications} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfessorDashboard;