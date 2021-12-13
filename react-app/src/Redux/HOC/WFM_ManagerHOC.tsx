import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WFMHome from '../../WFM/Home'

export default connect(
    (state:any)=>{
        return {
            wfmData:state.wfmData.wfmData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getWFM_manager:()=>{
                return {type:"WFM_MANAGER_ACTION"}
            },
            validateRequest:(request:any) =>{
                return {type:"WFM_REQUEST_ACTION",data:request}
            }
        },dispatch)
    }
)(WFMHome)