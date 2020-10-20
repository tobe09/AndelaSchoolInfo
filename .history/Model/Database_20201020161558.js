//import mongoose and connect
var mongoose = require('mongoose');

//var localAddress = 'mongodb://localhost:27017/schoolInfoDb';                                  //local development address
// var hostAddress = 'mongodb://tobe09:nkeody09@ds121955.mlab.com:21955/schoolinfodb';             //mLab repository address
var hostAddress = 'mongodb+srv://tobe09:nkeody09@schoolinfodb.fnxil.mongodb.net/<dbname>?retryWrites=true&w=majority';             //mLab repository address
mongoose.connect(hostAddress);

//check connection status
var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function () {
    console.log('Connected to mongo db server');
});

studentModel.find().then((res,a,b)=>{
    var a=1;
}).catch(err=>{
    var b=1;
})

//import student model
var studentDbModel = require('./StudentModel.js');
var studentModel = studentDbModel.studentModel;

//import all levels
var levelDb = require('./LevelModel.js');
var Levels = levelDb.Levels;

//import all faculties
var facultyDb = require('./FacultyModel.js');
var Faculties = facultyDb.Faculties;

//import all department
var departmentDb = require('./DepartmentModel.js');
var Departments = departmentDb.Departments;


//export database collections
module.exports = {
    studentModel: studentModel,
    Levels: Levels,
    Faculties: Faculties,
    Departments: Departments
};