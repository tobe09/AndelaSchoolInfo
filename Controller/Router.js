﻿//import express server
var express = require("express");
var router = express.Router();
exports.router = router


//database's data
var Database = require('../Model/Database.js');
var Students = Database.studentModel;                           //students model
var Faculties = Database.Faculties;                             //collection of all faculties
var Departments = Database.Departments;                         //collection of all departments


//validation functions importation
var Validation = require('./Scripts/Validation.js');
var isValidStudent = Validation.isValidStudent;                 //validate stdudent information
var newMatricNo = Validation.newMatricNo;                       //generate new matriculation number for student
var logError = Validation.logError;


//to locate application files (relative to application root)
var path = require('path');
var rootLocation = path.join(__dirname, '../');


var errorMsg = 'An error has occured';                          //to signify a server side error


//to get application web page
router.get('/', function (req, res) {
    res.sendFile('View/StudentPage.html', { root: rootLocation });
});
router.get('/StudentPage', function (req, res) {
    res.sendFile('View/StudentPage.html', { root: rootLocation });
});


//get database tables
router.get("/dbTables/:tableName", function (req, res) {
    var table;
    
    var tblName = req.params.tableName;
    
    //send database table according to its name
    switch (tblName) {
        case 'faculties': {
            table = Faculties;
            break;
        }
        case 'departments': {
            table = Departments;
            break;
        }
    }
    
    res.json(table);
});


router.route("/Students")

//get all students from the database sorted alphabetically
.get(function (req, res) {
    var response;                                                    //response object
    
    Students.find(function (err, allStudents) {
        if (err) {
            logError(err);
            response = { "Error": errorMsg };
        } 
        else if (allStudents.length == 0) {
            response = { "Error": "No student in database" }
        }
        else {
            response = allStudents;
        }
        
        res.json(response);                                         //send response 
    })
    .sort({ LastName: 1, FirstName: 1 });
})

//add student to the database using post
.post(function (req, res) {
    var newStudent = req.body;
    var isValidStudnt = isValidStudent(newStudent);
    
    //populate 'student' object properties if student details is valid
    if (isValidStudnt.isValid) {
        var student = new Students();                                   //student to be added
        
        student.FirstName = newStudent.FirstName;
        student.LastName = newStudent.LastName;
        student.MiddleName = newStudent.MiddleName;
        student.Faculty = newStudent.Faculty;
        student.Department = newStudent.Department;
        student.Level = newStudent.Level;
        student.DateOfBirth = new Date(newStudent.Year, newStudent.Month - 1, newStudent.Day);
        student.PhoneNo = newStudent.PhoneNo;
        student.Email = newStudent.Email;
        
        //start value of student matriculation number
        var preMatricNo = "^" + newStudent.Department.substr(0, 3).toUpperCase() + (newStudent.Level / 100);      
        
        //get all students in the same category and generate unique matric number
        Students.find({ MatricNo: { $regex: preMatricNo } }, function (err, allStudents) {
            
            if (err) {
                logError(err);
                res.json({ "Error": "Error getting students" });
            }
            else {
                var matricNo = newMatricNo(newStudent, allStudents);
                
                //add student matriculation number
                student.MatricNo = matricNo;
                
                //save updated student
                student.save(function (err, student) {
                    
                    if (err) {
                        //already existing email error
                        if (typeof (err.errors.Email) == 'object') {
                            res.json({ "Error": 'Email address already exists' });
                        }
                        else {
                            logError(err);
                            res.json({ "Error": errorMsg });
                        }
                    }
                    else {
                        res.json(student);                                  //return student
                    }
                })
            }
        })
    }
    //for invalid student details
    else {
        res.json({ "Error": isValidStudnt.message });
    }
});


router.route("/Students/:Id")

//get specific student based on id, matric no, first name or last name
.get(function (req, res) {
    var studentQuery = req.params.Id;
    
    //to validate objectId
    var checkObjectId = require('mongoose').Types.ObjectId;
    var validObjectId = checkObjectId.isValid(studentQuery);
    
    if (validObjectId) {                                        //check if the string has 12 characters for a GUID
        Students.find({ _id: studentQuery }, sendResult);
    } else {
        Students.find({ MatricNo: studentQuery.toUpperCase() }, sendResult);
    };
    
    function sendResult(err, student) {
        var response;
        
        if (err || student.length == 0) {                       //for cases of error or if the student does not exist
            if (err) {
                logError(err);
                response = { Error: errorMsg };
            }
            else {
                response = { Error: 'No such student found' };
            }
        }
        //return student
        else {
            response = student[0];
        }
        
        res.json(response);
    }
})

//update student information ("put" verb is idempotent, hence safer)
.put(function (req, res) {
    var studentId = req.params.Id;
    
    Students.findById(studentId, function (err, student) {
        
        if (err) {
            logError(err);                                                          //to handle errors/exceptions
            res.json({ "Error": errorMsg });
        }
        else {
            var updatedStudent = req.body;
            
            //check validity of student information
            var isValidStudnt = isValidStudent(updatedStudent)
            
            if (isValidStudnt.isValid) {
                student.FirstName = updatedStudent.FirstName;
                student.LastName = updatedStudent.LastName;
                student.MiddleName = updatedStudent.MiddleName;
                student.Faculty = updatedStudent.Faculty;
                student.DateOfBirth = new Date(updatedStudent.Year, updatedStudent.Month - 1, updatedStudent.Day);
                student.PhoneNo = updatedStudent.PhoneNo;
                student.Email = updatedStudent.Email;
                
                //check for changes in department or level (and also faculties indirectly)
                if (student.Department != updatedStudent.Department || student.Level != updatedStudent.Level) {
                    
                    //start value of student matriculation number
                    var preMatricNo = "^" + updatedStudent.Department.substr(0, 3).toUpperCase() + (updatedStudent.Level / 100);

                    //get all students in the same category and generate unique matric number
                    Students.find({ MatricNo: { $regex: preMatricNo } },function (err, allStudents) {
                        
                        if (err) {
                            logError(err);
                            res.json({ "Error": errorMsg });
                        }
                        else {
                            var matricNo = newMatricNo(updatedStudent, allStudents);
                            
                            //update student information
                            student.Department = updatedStudent.Department;
                            student.Level = updatedStudent.Level;
                            student.MatricNo = matricNo;
                            
                            saveUpdatedStudent(student);
                        }
                    })
                }
                //if no change is required for matric number
                else {
                    saveUpdatedStudent(student);
                }
                
                //save updated student
                function saveUpdatedStudent(studnt) {
                    studnt.save(function (err, updatedStudnt) {
                        if (err) {
                            //already existing email error
                            if (typeof (err.errors.Email) == 'object') {
                                res.json({ "Error": 'Email address already exists' });
                            }
                            else {
                                logError(err);
                                res.json({ "Error": errorMsg });
                            }
                        }
                        else {
                            res.json(updatedStudnt);                            //return updated student
                        }
                    })
                }
            } 

            else {
                res.json({ "Error": isValidStudnt.message });
            }
        }
    })
})

//delete student information
.delete(function (req, res) {
    var studentId = req.params.Id;
    
    //find student using his/her id and delete student
    Students.findByIdAndRemove(studentId, function (err, deletedStudent) {
        var response;
        
        if (err) {
            logError(err);
            response = { "Error": errorMsg };
        }
        else {
            response = deletedStudent;
        }
        
        res.json(response);
    })
});


//to send other files/data to the database
router.get('*', function (req, res) {
    var relativeAddress = req.url;                                          //get address of file from application root location
    res.sendFile(relativeAddress, { root: rootLocation });
});