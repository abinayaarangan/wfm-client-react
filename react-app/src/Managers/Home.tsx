import Logout from '../../src/logout'
// import axios from "axios"
 import { useEffect, useState} from "react"
import { Modal, Button } from 'react-bootstrap'
// import './home.scss';

type Employee = {
  EmployeeId: number;
  Name: string;
  Skills: string;
  Experience: number;
  Manager: string
}




type emp={
    employeeData:[];
    getEmployee:()=>{};
    sendRequest:() => {};
}

 const ManagerHome=({employeeData,getEmployee,sendRequest}:any)=>{
    const [enableRequest, setenableRequest] = useState(false);
    const [employeeList, setemployeeList] = useState<any>({});
    const [message,setmessage] =useState('')
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const submit = () => {
      setShow(false);

      sendRequest({
        employee_id : employeeList.x.EmployeeId,
        manager : employeeList.x.Manager,
        requestMessage : message
      });
      setTimeout(function(){return getEmployee(),4000});
  
    }
  

    useEffect(()=>{
         let username= localStorage.getItem("username");
   if(employeeData.length==0)
    getEmployee()
    },[]
    )

    function enableSoftLock(employee:any){
        setemployeeList(employee);
        setenableRequest(true);
        setmessage('');
        setShow(true);
        // setTimeout(function(){return getEmployee(),4000});
    }
    return (
        <div>

        <div className = "px-3 py-2 bg-dark text-white">
            <div className = "d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                  <h1 className="text-white col col-lg-10">Manager Home</h1>
                  <div className = "d-flex flex-row-reverse col col-lg-2"><Logout></Logout></div>
            </div>
            
        </div>
            <br/>
       
        
        {/* <button className="btn btn-success" onClick={getEmployee}>
              Get Employee</button> */}
        <table className="table">
                <thead className="table-dark table-striped">
                    <tr >
                    <th className="text-center">Employee id</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Skills</th>
                    <th className="text-center">Experience</th>
                    <th className="text-center">Manager</th>
                    <th className="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeData.map((x:Employee)=>{
                        return(
                            <tr key={x.EmployeeId}>
                                <td className="text-center">{x.EmployeeId}</td>
                                <td className="text-center">{x.Name}</td>
                                <td className="text-center">{x.Skills}</td>
                                <td className="text-center">{x.Experience}</td>
                                <td className="text-center">{x.Manager}</td>
                                <td className="text-center"><button className="btn btn-primary" onClick={() => enableSoftLock({x})}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                                Request Lock</button></td>
                            </tr>
                        )
                        })
                    }
                </tbody>
        </table>
        <div>
          {enableRequest ?
            <Modal show={show} onHide={handleClose}>

              <Modal.Header closeButton>
                <Modal.Title>Soft Lock Request Confirmation</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <div className="form-group row">
                        <label className="fw-bold col-sm-5 ">Emp ID: </label>
                        <label className = "col-sm-7">{employeeList.x.EmployeeId}</label>
                </div>
                
                <div className="form-group row">
                    <label className="fw-bold col-sm-5 ">Name:</label>
                    <label className = "col-sm-7">{employeeList.x.Name}</label>
                </div>
                <br/>
                <div className="form-outline">
                  <label className="fw-bold">Request Message(message must be atleast 10 char long)</label>
                  <textarea className="form-control" minLength={10} onChange={(e)=>{setmessage(e.target.value)} }  value={message} ></textarea>
                  <div id="validationServerUsernameFeedback" className="invalid-feedback">
        Please choose a username.
      </div>
                </div>


              </Modal.Body>

              <Modal.Footer>

                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={submit}>Submit</Button>

              </Modal.Footer>

            </Modal>


            : null
          }
        </div>
        </div>
    )
}

export default ManagerHome