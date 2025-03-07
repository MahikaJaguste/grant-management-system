import React from "react";
import { Modal, Button } from 'react-bootstrap';

const ApplicationDetails = ({ show, handleClose, application }) => {
  if (!application) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Application Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Title</h5>
        <p>{application.title}</p>
        <h5>Abstract</h5>
        <p>{application.abstract}</p>
        <h5>Objectives</h5>
        <p>{application.objectives}</p>
        <h5>Research Question/Hypotheses</h5>
        <p>{application.research_question}</p>
        <h5>Background/Literature</h5>
        <p>{application.background}</p>
        <h5>Plan of Investigation</h5>
        <p>{application.plan}</p>
        <h5>Dissemination</h5>
        <p>{application.dissemination}</p>
        <h5>CV</h5>
        <p>{application.cv}</p>
        <h5>Budget</h5>
        <p>{application.budget}</p>
        <h5>Justification for the Budget</h5>
        <p>{application.budget_justification}</p>
        <h5>Non-academic Dissemination</h5>
        <p>{application.non_academic_dissemination}</p>
        <h5>Project Management</h5>
        <p>{application.project_management}</p>
        <h5>Appendices</h5>
        <p>{application.appendices}</p>
        <h5>Ethics</h5>
        <p>{application.ethics}</p>
        <h5>Data Management Plan</h5>
        <p>{application.data_management_plan}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationDetails;
