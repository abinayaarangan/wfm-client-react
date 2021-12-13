var express=require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt=require("jsonwebtoken");
const sequelize = require('sequelize');
const { softlock } = require("../orm/model");

route.post("/signin",async function(request,response){
    const {username,password}=request.body 
try{
   const user = await model.user.findOne({where:{username:username}})
   let result = user.dataValues
   
   if(result.password===password) 
      {
         response.json(
            {
               username: username,
               usertype: result.role,
               token: jwt.sign({username:username,password:password},"node-app-22")
            }
         )
      }
      else
           response.status(401).send("Username or Password incorrect")
}
catch(e)
{
   console.log(e,'user')
        response.status(500)
}

})

route.post("/manager",async function(request,response){
   const man=request.body.manager 
try{
   const employees = await model.skillmap.findAll({
      group: ['employee_id'],
      // attributes: ['employee_id'],
      include: [{
         model: model.employee,
         attributes: ['name', 'experience', 'manager'],
         required: true,
         where: { manager: man, lockstatus: 'not_requested' }
      }
         , {
         model: model.skill,
         attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('skill.name')), 'skills']],
         require: true
      }
      ]
   })

   let managers = [];
   employees.map(employee => {
      let manager = {
         EmployeeId: employee.dataValues.employee_id,
         Name: employee.dataValues.employee.name,
         Skills: employee.dataValues.skill.dataValues.skills,
         Experience: employee.dataValues.employee.experience,
         Manager: employee.dataValues.employee.manager
      }
      managers.push(manager)
   });
   if (managers.length > 0) {
      response.json(managers)
   }
   else
      response.status(401).send("Failed")
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }

})


route.post("/updateEmployeeStatus", async function (request, response) {
   let employee_id = request.body.employee_id
   let manager = request.body.manager
   let requestMessage =  request.body.requestMessage;
   try {
      let employee = await model.employee.findOne({ where: { employee_id: employee_id } })
      employee.lockstatus = 'request_waiting';
      await employee.save();
      await model.softlock.create({ employee_id: employee_id, manager: manager, requestmessage: requestMessage })
      await employee.reload();
      response.status(200)
   } catch (e) {
      console.log(e)
      response.status(500)
   }
 })

 route.post("/validateManagerRequest", async function (request, response) {
   
   try {
      let employee_id = request.body.employee_id
      let lockid = request.body.lockid;
      let softlock_status = request.body.status;
      let emp_status = '';
      if (softlock_status == 'approve') {
         sl_status = 'approved'
         emp_status = 'locked'
      } else {
         sl_status = 'rejected'
         emp_status = 'rejected'
      }
      let employee = await model.employee.findOne({ where: { employee_id: employee_id } })
      employee.lockstatus = emp_status;
      await employee.save();
      let softlock = await model.softlock.findOne({ where: { lockid: lockid } })
      softlock.status = sl_status;
      await softlock.save();
      // await employee.reload();
      response.status(200)
   } catch (e) {
      console.log(e)
      response.status(500)
   }
 })
 
 route.post("/getwfmManager", async function (request, response) {
    try {
       let wfm_man = request.body.wfm_manager;
       console.log('wfm:', wfm_man);

       const manager_requests = await model.softlock.findAll({
         group: ['employee_id'],
          attributes: ['employee_id','reqdate','requestmessage','lockid'],
          required: true,
         
          include: [{
            model: model.employee,
            attributes: [ 'manager', 'wfm_manager'],
            required: true,
            where: { wfm_manager: wfm_man, lockstatus: 'request_waiting' }
         }]
   
       })
       let wfm_managers = [];
       manager_requests.map(employee => {
          let wfm_manager = {
             EmployeeId: employee.dataValues.employee_id,
             Manager: employee.dataValues.employee.manager,
             reqDate: employee.dataValues.reqdate,
             wfm_manager: employee.dataValues.employee.wfm_manager,
             requestMessage: employee.dataValues.requestmessage,
             lockid: employee.dataValues.lockid
          }
          wfm_managers.push(wfm_manager)
       });

       if (wfm_managers.length > 0) {
          response.json(wfm_managers)
       }
       else
          response.status(401).send("Failed")
    }

    catch (e) {
       console.log(e)
       response.status(500)
    }

})

module.exports=  route