import { Modal, Button } from 'react-bootstrap'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestManager =({props,sendRequest}:any) => {
    const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const submit = () => {
    setShow(false);
    sendRequest({
      employee_id : props.employeeList.x.EmployeeId,
      manager :  props.employeeList.x.Manager,
      requestMessage : 'Most Wanted!'
    });

  }

  // function description=(value:any) =>{
        
  // }

  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Request</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3>Emp ID: {props.employeeList.x.EmployeeId}</h3>
        <div className="form-outline">
          <textarea className="form-control" ></textarea>
         
        </div>


      </Modal.Body>

      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={submit}>Submit</Button>

      </Modal.Footer>

    </Modal>
  )
}
export default RequestManager;