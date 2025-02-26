import { useState } from "react";
import { useSubmitApplication } from "../hooks/useApplications";

const ApplicationForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundRequested, setFundRequested] = useState("");


  const submitApplication = useSubmitApplication();

  const handleSubmit = (e) => {
      e.preventDefault();
      submitApplication.mutate({ title, description, fundRequested });
      setTitle("");
      setDescription("");
      setFundRequested("");
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
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter grant description"
      className="form-control mb-2"
    />
    <input
      type="number"
      value={fundRequested}
      onChange={(e) => setFundRequested(e.target.value)}
      placeholder="Enter fund requested"
      className="form-control mb-2"
    />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};
export default ApplicationForm;