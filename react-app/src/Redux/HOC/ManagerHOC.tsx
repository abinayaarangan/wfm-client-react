import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagerHome from '../../Managers/Home';

export default connect(
    (state:any)=>{
        return {
           employeeData:state.employeeData.employeeData
        }
    },
    (dispatch)=>{
        
        return bindActionCreators({
            getEmployee:()=>{
                return {type:"MANAGER_ACTION"}
            },
            sendRequest:(request:any) => {
                return {type:"SEND_REQUEST",data:request}
            }
        },dispatch)
    }
)(ManagerHome)