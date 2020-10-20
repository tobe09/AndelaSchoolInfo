//import mongoose and connect
var mongoose = require('mongoose');

//var localAddress = 'mongodb://localhost:27017/schoolInfoDb';                                  //local development address
var hostAddress = 'mongodb://tobe09:nkeody09@ds121955.mlab.com:21955/schoolinfodb';             //mLab repository address
mongoose.connect(hostAddress, { useMongoClient: true });

//check connection status
var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function () {
    console.log('Connected to mongo db server');
});

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