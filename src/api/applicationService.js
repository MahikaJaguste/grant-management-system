import axiosInstance, {STATIC_FLAG} from './axiosConfig';

const staticApplications = [
  {
    id: 1,
    title: "Research on AI",
    abstract: "This is an abstract for AI research.",
    objectives: "Objective 1, Objective 2",
    research_question: "What is the impact of AI?",
    background: "Background information",
    plan: "Plan details",
    dissemination: "Dissemination details",
    cv: "CV details",
    budget: "Budget details",
    budget_justification: "Budget justification details",
    non_academic_dissemination: "Non-academic dissemination details",
    project_management: "Project management details",
    appendices: "Appendices details",
    ethics: "Ethics details",
    data_management_plan: "Data management plan details",
    status: "APPROVED",
  },
  {
    id: 2,
    title: "Research on Quantum Computing",
    abstract: "This is an abstract for Quantum Computing research.",
    objectives: "Objective 1, Objective 2",
    research_question: "What is the impact of Quantum Computing?",
    background: "Background information",
    plan: "Plan details",
    dissemination: "Dissemination details",
    cv: "CV details",
    budget: "Budget details",
    budget_justification: "Budget justification details",
    non_academic_dissemination: "Non-academic dissemination details",
    project_management: "Project management details",
    appendices: "Appendices details",
    ethics: "Ethics details",
    data_management_plan: "Data management plan details",
    status: "REJECTED",
  },
  {
    id: 3,
    title: "Research on Blockchain",
    abstract: "This is an abstract for Blockchain research.",
    objectives: "Objective 1, Objective 2",
    research_question: "What is the impact of Blockchain?",
    background: "Background information",
    plan: "Plan details",
    dissemination: "Dissemination details",
    cv: "CV details",
    budget: "Budget details",
    budget_justification: "Budget justification details",
    non_academic_dissemination: "Non-academic dissemination details",
    project_management: "Project management details",
    appendices: "Appendices details",
    ethics: "Ethics details",
    data_management_plan: "Data management plan details",
    status: "PENDING",
  },
];

const staticProfessorNotifications = [
  { id: 1, title: "Grant Application Approved", description: "Grant application with ID 1 has been approved." },
  { id: 2, title: "Grant Application Rejected", description: "Grant application with ID 2 has been rejected." },
];

export const fetchApplications = async (filters) => {
  if(STATIC_FLAG) {
    const valid_statuses = filters.status;
    return staticApplications.filter(app => valid_statuses.length == 0 || valid_statuses.includes(app.status)).reverse();
  }
  const response = await axiosInstance.get("/grants/list", { params: filters });
  return response?.data?.grants;
};

export const submitApplication = async (applicationData) => {
  if (STATIC_FLAG) {
    return { status: "SUCCESS", grant: applicationData };
  }
  const response = await axiosInstance.post("/grants/submit", applicationData);
  return response?.data;
};

export const fetchProfessorNotifications = async () => {
  if(STATIC_FLAG) {
    return staticProfessorNotifications.reverse();
  }
  const response = await axiosInstance.get("/notifications/professor");
  return response?.data?.notifications;
}