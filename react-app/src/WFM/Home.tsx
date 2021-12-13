import Logout from "../../src/logout"
import { useEffect, useState} from "react"
import { Modal, Button } from 'react-bootstrap'
import Select from 'react-select';
import React from "react";

// type Employee = {
//     EmployeeId: number;
//     Name: string;
//     Skills: string;
//     Experience: number;
//     Manager: string

// }

type wfm={
    wfmData:[];
    getWFM_manager:()=>{};
    validateRequest:()=>{};
}


const WFMHome=({wfmData,getWFM_manager,validateRequest}:any)=>{
    const [enableRequest, setenableRequest] = useState(false);
    const [employeeList, setemployeeList] = useState<any>({});
    const [show, setShow] = useState(true);
    const [selectedStatus, setselectedStatus] = useState('');

    const handleClose = () => setShow(false);

    const handleChange = (e:any) => {
        setselectedStatus(e.target.value);
    }
    const SelectList:any = [
        {
            label: "Select",
          value: "select",
        },
        {
          label: "Approve",
          value: "approve",
        },
        {
          label: "Reject",
          value: "reject",
        }
    ]

    const submit = () => {
      setShow(false);
      validateRequest({
        employee_id : employeeList.x.EmployeeId,
        status : selectedStatus,
        lockid : employeeList.x.lockid
      });
      setTimeout(function(){return getWFM_manager(),4000});
  
    }
    function enableDetails(employee:any){

        setemployeeList(employee);
        setenableRequest(true);
        setShow(true);

    }

    useEffect(()=>{
        getWFM_manager()
    },[]
    )

    return (
        <div>

        <div className = "px-3 py-2 bg-dark text-white">
        <div className = "d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                  <h1 className="text-white col col-lg-10">WFM Manager Home</h1>
                  <div className = "d-flex flex-row-reverse col col-lg-2"><Logout></Logout></div>
            </div>
        </div>
            <br/>
            <table className="table">
                <thead className="table-dark table-striped">
                    <tr >
                    <th className="text-center">Employee id</th>
                    <th className="text-center">Requestee</th>
                    <th className="text-center">Request Date</th>
                    <th className="text-center">WFM Manager</th>
                    <th className="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    { wfmData.length > 0 ?
                    
                        wfmData.map((x:any)=>{
                        return(
                            <tr key={x.EmployeeId}>
                                <td className="text-center">{x.EmployeeId}</td>
                                <td className="text-center">{x.Manager}</td>
                                <td className="text-center">{x.reqDate}</td>
                                <td className="text-center">{x.wfm_manager}</td>
                                <td className="text-center"><button className="btn btn-primary"  onClick={() => enableDetails({x})} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                               View Details</button></td>
                            </tr>
                        )
                        })
                    :  
                    <div >
                        <div>
                        {/* <div className = "d-flex justify-content-center bd-highlight mb-3"> */}
                            <div className = "col-8">   No data found</div>
                            </div>
                            {/* </div> */}
                        </div>
                     }
                </tbody>
        </table>
        <div>
          {enableRequest ?
            //  <RequestManager
            //     employeeList = {employeeList}
            //  /> 
            <Modal show={show} onHide={handleClose}>

              <Modal.Header closeButton>
                <Modal.Title>Soft Lock Request Confirmation</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <form>
                  <div className="form-group row">
                        <label className="fw-bold col-sm-5 ">Emp ID: </label>
                        <label className = "col-sm-7">{employeeList.x.EmployeeId}</label>
                </div>
                <br/>
                <div className="form-group row">
                    <label className="fw-bold col-sm-5 ">Requestee:</label>
                    <label className = "col-sm-7">{employeeList.x.Manager}</label>
                </div>
                <br/>
                <div className="form-group row">
                    <label className="fw-bold col-sm-5 ">Employee Manager:</label>
                    <label className = "col-sm-7">{employeeList.x.Manager}</label>
                </div>
                <br/>
                <div className="form-group row">
                    <label className="fw-bold col-sm-5 ">Request Description:</label>
                    <label className = "col-sm-7">{employeeList.x.requestMessage}</label>
                </div>
                <br/>
                <div className="form-group row">
                    <label className="fw-bold col-sm-5 ">Status:</label>
                    <div className="select-container col-sm-7">
                    <select onChange={handleChange.bind(this)} >
                        {SelectList.map((SelectList:any) => (
                            <option value={SelectList.value} >{SelectList.label}</option>
                        ))}
                    </select>
                </div>
                </div>
                {/* <div className="form-group">
                <label className="fw-bold">Stataus </label>
                </div>
                <div className="select-container">
                    <select onChange={handleChange.bind(this)} >
                        {SelectList.map((SelectList:any) => (
                            <option value={SelectList.value} >{SelectList.label}</option>
                        ))}
                    </select>
                </div> */}
                </form>

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


export default WFMHome