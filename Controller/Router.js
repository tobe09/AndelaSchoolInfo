//import express server
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
var pascalCase = Validation.pascalCase;                         //used to format a name in pascal casing
var ageRange = Validation.ageRange;                             //denotes the minimum and maximum age of a student
var logError = Validation.logError;                             //used to log errors to the console
var deptPrefix = Validation.deptPrefix;                         //used to get a department's prefix


//to validate objectId
var checkObjectId = require('mongoose').Types.ObjectId;


//to locate application files (relative to application root)
var path = require('path');
var rootLocation = path.join(__dirname, '../');


var errorMsg = 'Error Communicating With Database';                          //to signify a server side error



//get web page
router.get('/', function (req, res) {
    res.sendFile('/View/StudentInfoPage.html', { root: rootLocation });
});
router.get('/StudentPage', function (req, res) {
    res.sendFile('/View/StudentInfoPage.html', { root: rootLocation });
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
        case 'ageRange': {
            table = ageRange;
            break;
        }
        default: {
            table = { Error: "Selected table was not found" };
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
            response = { Error: errorMsg };
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
    
    //validate student details before creating student
    if (isValidStudnt.isValid) {
        var student = new Students();                                   //student to be added
        
        student.LastName = pascalCase(newStudent.LastName);
        student.FirstName = pascalCase(newStudent.FirstName);
        student.MiddleName = pascalCase(newStudent.MiddleName);
        student.Faculty = newStudent.Faculty;
        student.Department = newStudent.Department;
        student.Level = newStudent.Level;
        student.DateOfBirth = new Date(newStudent.Year, newStudent.Month - 1, newStudent.Day);
        student.PhoneNo = newStudent.PhoneNo;
        student.Email = newStudent.Email;
        
        //start value of student matriculation number
        var preMatricNo = "^" + deptPrefix(newStudent.Department, newStudent.Faculty) + (newStudent.Level / 100);      
        
        //get all students in the same department and level and generate unique matric number
        Students.find({ MatricNo: { $regex: preMatricNo } }, function (err, matchingStudents) {
            
            if (err) {
                logError(err);
                res.json({ Error: errorMsg });
            }
            else {
                preMatricNo = preMatricNo.substr(1, 4);                                 //to remove leading '^' sign
                var matricNo = newMatricNo(preMatricNo, matchingStudents);              //new matriculation number generated
                
                //add student matriculation number to the new student object properties
                student.MatricNo = matricNo;
                
                //save updated student
                student.save(function (err, student) {
                    
                    if (err) {
                        //already existing email error
                        if (typeof (err.errors.Email) == 'object') {
                            res.json({ Error: 'Email address already exists' });
                        }
                        else {
                            logError(err);
                            res.json({ Error: errorMsg });
                        }
                    }
                    else {
                        res.json(student);                                              //return student
                    }
                })
            }
        })
    }
    //for invalid student details
    else {
        res.json({ Error: isValidStudnt.message });
    }
});



router.route("/Students/:Id")

//get specific student based on unique id or matriculation number
.get(function (req, res) {
    var studentQuery = req.params.Id;

    var isValidObjectId = checkObjectId.isValid(studentQuery);     //validate objectId
    
    if (isValidObjectId) {                                        //check if the string is a GUID
        Students.find({ _id: studentQuery }, sendResult);
    } 
    else {
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
                response = { Error: 'No such student found in the database' };
            }
        }
        //return student
        else {
            response = student[0];
        }
        
        res.json(response);
    }
})

//update student information (technically, the "put" verb is safe and idempotent, as opposed to post)
.put(function (req, res) {
    var studentId = req.params.Id;                                    //updated student id
    var updatedStudent = req.body;                                   //updated student information
    
    var isValidObjectId = checkObjectId.isValid(studentId);         //validate studentId as objectId
    var isValidStudnt = isValidStudent(updatedStudent)//check validity of student information
    
    if (isValidObjectId && isValidStudnt.isValid) {
        
        Students.findById(studentId, function (err, student) {
            
            if (err) {
                logError(err);                                                          //to handle errors/exceptions
                res.json({ Error: errorMsg });
            }
            else {
                
                if (student != null) {                      //sttudent found
                    student.LastName = pascalCase(updatedStudent.LastName);
                    student.FirstName = pascalCase(updatedStudent.FirstName);
                    student.MiddleName = pascalCase(updatedStudent.MiddleName);
                    student.Faculty = updatedStudent.Faculty;
                    student.DateOfBirth = new Date(updatedStudent.Year, updatedStudent.Month - 1, updatedStudent.Day);
                    student.PhoneNo = updatedStudent.PhoneNo;
                    student.Email = updatedStudent.Email;
                    
                    //check for changes in department or level
                    if (student.Department != updatedStudent.Department || student.Level != updatedStudent.Level) {
                        
                        //start value of student matriculation number
                        var preMatricNo = "^" + deptPrefix(updatedStudent.Department, updatedStudent.Faculty) + (updatedStudent.Level / 100);
                        
                        //get all students in the same category and generate unique matric number
                        Students.find({ MatricNo: { $regex: preMatricNo } }, function (err, matchingStudents) {
                            
                            if (err) {
                                logError(err);
                                res.json({ Error: errorMsg });
                            }
                            else {
                                preMatricNo = preMatricNo.substr(1, 4);                                 //to remove leading '^' sign
                                var matricNo = newMatricNo(preMatricNo, matchingStudents);
                                
                                //update student information
                                student.Department = updatedStudent.Department;
                                student.Level = updatedStudent.Level;
                                student.MatricNo = matricNo;
                                
                                saveUpdatedStudent(student);
                            }
                        })
                    }
                    //no change to department and level
                    else {
                        saveUpdatedStudent(student);
                    }
                    
                    //save updated student
                    function saveUpdatedStudent(studnt) {
                        studnt.save(function (err, updatedStudnt) {
                            if (err) {
                                //already existing email error
                                if (typeof (err.errors.Email) == 'object') {
                                    res.json({ Error: 'Email address already exists' });
                                }
                                else {
                                    logError(err);
                                    res.json({ Error: errorMsg });
                                }
                            }
                            else {
                                res.json(updatedStudnt);                            //return updated student
                            }
                        })
                    }
                }

                //student with Id not found
                else {
                    res.json({ Error: 'No student exists with submitted Id' });
                }
            }
        })                                      //end of Student.findById... section
    } 

    //erroneous data entry
    else {
        if (!isValidObjectId) {
            res.json({ Error: 'Student Id submitted is not in the form of a valid object Id' });
        }
        else {
            res.json({ Error: isValidStudnt.message });
        }
    }
})

//delete student information
.delete(function (req, res) {
    var studentId = req.params.Id;
    
    //find student using his/her id and delete student
    Students.findByIdAndRemove(studentId, function (err, deletedStudent) {
        var response;
        
        if (err) {
            logError(err);
            response = { Error: errorMsg };
        }
        else if (deletedStudent == null) { 
            response={Error: 'No student exists with submitted Id'}
        }
        else {
            response = deletedStudent;
        }
        
        res.json(response);
    })
});



//to send other files/data to the database
router.get('*', function (req, res) {
    var relativeAddress = req.url;                                          //get address of file from request object
    res.sendFile(relativeAddress, { root: rootLocation });
});