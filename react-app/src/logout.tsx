const Logout=()=>{
return(
    <div className = "d-flex flex-row-reverse">
    <a href='/login' onClick={()=>localStorage.clear()} className="btn btn-default btn-sm Logout">
    <button className="fa fa-sign-out =btn btn-danger">Log out</button> </a>
    </div>
)
}
export default Logout;