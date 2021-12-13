const Sequelize = require('sequelize');
var sequelize=require('./connection');

var user=sequelize.define('user',{
    username:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
},{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
});

//employee 
var employee=sequelize.define('employees',{
      employee_id:{
       type: Sequelize.INTEGER,
       primaryKey:true
      },
      name:{
       type: Sequelize.TEXT,
       allowNull:false
      },
      status:{
       type: Sequelize.TEXT,
       allowNull:false
      },
      manager:{
       type: Sequelize.TEXT,
       allowNull:true
      },
      wfm_manager:{
       type: Sequelize.TEXT,
       allowNull:true
      },
      email:{
       type: Sequelize.TEXT,
       allowNull:true
      },
      lockstatus:{
       type: Sequelize.TEXT,
       allowNull:true
      },
      experience:{
       type:Sequelize.DECIMAL(5,0),
       allowNull:true
      },
      profile_id:{
       type:Sequelize.INTEGER,
       allowNull:true
      }
    },{
      //don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    
    // If don't want createdAt
    createdAt: false,
    
    // If don't want updatedAt
    updatedAt: false
    }
  );
  
  //skill 
  var skill=sequelize.define('skill',{
      skillid:{
       type: Sequelize.DECIMAL(5,0),
       primaryKey:true
      },
      name:{
          type: Sequelize.TEXT,
          allowNull:false
      }
    },{
      //don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    
    // If don't want createdAt
    createdAt: false,
    
    // If don't want updatedAt
    updatedAt: false
    }
  );
  
  //skillmap
  var skillmap=sequelize.define('skillmaps',null,{
          //don't add the timestamp attributes (updatedAt, createdAt)
       timestamps: false,

       // If don't want createdAt
       createdAt: false,

       // If don't want updatedAt
       updatedAt: false
       }
  );

skillmap.belongsTo(skill, { foreignKey: 'skillid' });
skillmap.belongsTo(employee, { foreignKey: 'employee_id' });
skillmap.removeAttribute('id');

var softlock = sequelize.define('softlocks', {
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  manager: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  reqdate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue:Sequelize.NOW
  },
  status: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:'waiting'
  },
  lockid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  requestmessage: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  wfmremark: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  managerstatus: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  mgrstatuscomment: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  mgrlastupdate: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  lastUpdated: {
    type: Sequelize.DATE,
    allowNull: true,
  }
}, {
  //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}
);
softlock.belongsTo(employee, { foreignKey: 'employee_id' });

// softlock.belongsTo(user, { foreignKey: 'manager' });
// softlock.removeAttribute('id');
// softlock.removeAttribute('createdAt');
// softlock.removeAttribute('updatedAt');

  //Syncing Skill table
  skill.sync({force: false}).then(() => {
      console.log("skill table Synched!!!");
  });
  
  //Syncing SkillMap table
skillmap.sync({force: false}).then(() => {      
      console.log("skill map table Synched!!!");
  });
  
  //Syncing Employee table
  employee.sync({force: false}).then(() => {
      console.log("Employee table Synched!!!");
  });
  
  //Syncing softlock table
  softlock.sync({force: false}).then(() => {
    console.log("Sofylock table Synched!!!");
});
  module.exports={employee:employee,skill:skill,skillmap:skillmap,user:user,softlock:softlock};
  