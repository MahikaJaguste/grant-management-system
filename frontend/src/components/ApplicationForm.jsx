import { useState } from "react";
import { useSubmitApplication } from "../hooks/useApplications";

const ApplicationForm = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [objectives, setObjectives] = useState("");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [background, setBackground] = useState("");
  const [plan, setPlan] = useState("");
  const [dissemination, setDissemination] = useState("");
  const [cv, setCv] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetJustification, setBudgetJustification] = useState("");
  const [nonAcademicDissemination, setNonAcademicDissemination] = useState("");
  const [projectManagement, setProjectManagement] = useState("");
  const [appendices, setAppendices] = useState("");
  const [ethics, setEthics] = useState("");
  const [dataManagementPlan, setDataManagementPlan] = useState("");

  const submitApplication = useSubmitApplication();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitApplication.mutate({
      title,
      abstract,
      objectives,
      researchQuestion,
      background,
      plan,
      dissemination,
      cv,
      budget,
      budgetJustification,
      nonAcademicDissemination,
      projectManagement,
      appendices,
      ethics,
      dataManagementPlan,
    });
    setTitle("");
    setAbstract("");
    setObjectives("");
    setResearchQuestion("");
    setBackground("");
    setPlan("");
    setDissemination("");
    setCv("");
    setBudget("");
    setBudgetJustification("");
    setNonAcademicDissemination("");
    setProjectManagement("");
    setAppendices("");
    setEthics("");
    setDataManagementPlan("");
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
          placeholder="Enter grant title"
          className="form-control mb-2"
        />
        <textarea
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Enter abstract/summary"
          className="form-control mb-2"
        />
        <textarea
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder="Enter objectives"
          className="form-control mb-2"
        />
        <textarea
          value={researchQuestion}
          onChange={(e) => setResearchQuestion(e.target.value)}
          placeholder="Enter research question/hypotheses"
          className="form-control mb-2"
        />
        <textarea
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="Enter background/literature"
          className="form-control mb-2"
        />
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Enter plan of investigation"
          className="form-control mb-2"
        />
        <textarea
          value={dissemination}
          onChange={(e) => setDissemination(e.target.value)}
          placeholder="Enter dissemination"
          className="form-control mb-2"
        />
        <textarea
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          placeholder="Enter CV"
          className="form-control mb-2"
        />
        <textarea
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter budget"
          className="form-control mb-2"
        />
        <textarea
          value={budgetJustification}
          onChange={(e) => setBudgetJustification(e.target.value)}
          placeholder="Enter justification for the budget"
          className="form-control mb-2"
        />
        <textarea
          value={nonAcademicDissemination}
          onChange={(e) => setNonAcademicDissemination(e.target.value)}
          placeholder="Enter non-academic dissemination"
          className="form-control mb-2"
        />
        <textarea
          value={projectManagement}
          onChange={(e) => setProjectManagement(e.target.value)}
          placeholder="Enter project management"
          className="form-control mb-2"
        />
        <textarea
          value={appendices}
          onChange={(e) => setAppendices(e.target.value)}
          placeholder="Enter appendices"
          className="form-control mb-2"
        />
        <textarea
          value={ethics}
          onChange={(e) => setEthics(e.target.value)}
          placeholder="Enter ethics"
          className="form-control mb-2"
        />
        <textarea
          value={dataManagementPlan}
          onChange={(e) => setDataManagementPlan(e.target.value)}
          placeholder="Enter data management plan"
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ApplicationForm;