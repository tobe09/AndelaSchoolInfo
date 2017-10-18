//database's data
var Database = require('../../Model/Database.js');
var Faculties = Database.Faculties;
var Departments = Database.Departments;
var Levels = Database.Levels;


//validate student details
var isValidStudent = function isValidStudent(student) {
    var status = new Object();
    
    var firstNameValid = checkName(student.FirstName);
    var lastNameValid = checkName(student.LastName);
    var facultyValid = checkFaculty(student.Faculty);
    var deptValid = false;
    if (facultyValid) {                                                          //if faculty is valid, check department's validity
        deptValid = checkDepts(student.Department, student.Faculty);
    }
    var levelValid = checkLevel(student.Level);
    var emailValid = checkEmail(student.Email);
    var phoneNoValid = checkPhoneNo(student.PhoneNo);
    var dobValid = checkDob(student.Day, student.Month, student.Year);
    
    if (firstNameValid && lastNameValid && facultyValid && deptValid && levelValid && emailValid && phoneNoValid && dobValid.isValid) {
        status.isValid = true;
        status.message = "Valid Student";
    }
    else {
        //generate message relating to invalid property
        status.isValid = false;
        if (!lastNameValid) { status.message = "Invalid Last Name."; }
        else if (!firstNameValid) { status.message = "Invalid First Name."; }
        else if (!facultyValid) { status.message = "Faculty chosen does not exist in our database."; }
        else if (!deptValid) { status.message = "Department does not exist for chosen faculty."; }
        else if (!levelValid) { status.message = "Invalid Level. Level should either 100, 200, 300, 400, 500 0r 600."; }
        else if (!dobValid.isValid) { status.message = dobValid.message; }
        else if (!phoneNoValid) { status.message = "Invalid Phone Number."; }
        else { status.message = "Invalid Email Address."; }
    }
    
    return status;
}


//check if a valid name is sent (helper function)
var checkName = function checkName(name) {
    var status;
    
    //name must contain at least 2 characters  
    if (name.length > 2) {
        status = true;
    }
    else {
        status = false;
    }
    
    return status;
}


//loop through Faculties collection to validate faculty (helper function)
var checkFaculty = function checkFaculty(faculty) {
    var status = false;
    
    for (var i = 0; i < Faculties.length; i++) {
        if (Faculties[i].Faculty == faculty) {
            status = true;
            break;
        }
    }
    
    return status
}


//loop through Departments collection to validate department (helper function)
var checkDepts = function checkDepts(dept, fac) {
    var status = false;
    
    for (var i = 0; i < Departments.length; i++) {
        
        if (Departments[i].Faculty == fac) {
            
            //check department under selected faculty
            for (var j = 0; j < Departments[i].Depts.length; j++) {
                if (Departments[i].Depts[j].Department == dept) {
                    status = true;
                    break;
                }
            }
            break;
        }
    }
    
    return status
}


//loop through Levels collection to validate level (helper function)
var checkLevel = function checkLevel(level) {
    var status = false;
    
    if (typeof (Levels.Error) == 'undefined') {
        
        for (var i = 0; i < Levels.length; i++) {
            if (Levels[i].Level == level) {
                status = true;
                break;
            }
        }
    }
    
    return status
}


//to validate email address (helper function)
var checkEmail = function checkEmail(email) {
    var status;
    
    var emailRegEx = new RegExp("^[(\\w)+@(\\w)+\\.(\\w)+$]{5,32}");                 //regular expression matching a standard email address
    status = emailRegEx.test(email);
    
    return status;
}


//to validate phone number (phone number can start with a "+" sign) (helper function)
var checkPhoneNo = function checkPhoneNo(phoneNo) {
    var status;
    
    var phoneNoRegEx = new RegExp("^\\+?[\\d]{4,16}$");                              //regular expression matching a standard email address
    status = phoneNoRegEx.test(phoneNo);
    
    return status;
}


var minAge = 16;
var maxAge = 70;
//check date of birth for validity (helper function)
var checkDob = function checkDob(day, month, year) {
    var status = new Object();
    status.isValid = false
    
    var day = parseInt(day);
    var month = parseInt(month);
    var year = parseInt(year);
    
    if (!isNaN(day) && !isNaN(month) && !isNaN(year) && day > 0 && month > 0 && year > 0) {
        
        //get milliseconds gap between birth date and today's date and convert to years
        var age = new Date() - new Date(year, month - 1, day);
        age = age / (1000 * 60 * 60 * 24 * 365.25);
        
        //to account for student age with respect to the present
        if (age < minAge || age > maxAge) {
            
            if (age < minAge) {
                status.message = "Student is too young (" + parseInt(age) + "). Student should be between 16 and 70 years of age";
            }
            else {
                status.message = "Student is too old (" + parseInt(age) + "). Student should be between 16 and 70 years of age";
            }
        }
        else {
            
            //to account for leap year and century leap year
            if (month == 2 && 
                ((day > 28 && (year % 4 != 0 || (year % 100 == 0 && year % 400 != 0))) || 
                (day > 29 && (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))))) {
                
                if ((day > 28 && (year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)))) {
                    status.message = 'Year ' + year + " has 28 days for february";
                }
                else {
                    status.message = 'Year ' + year + " has 29 days for february";
                }
            }

            //to account for months with 30 days
            else if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
                status.message = "Selected month has only 30 days";
            }

            //to account for other months
            else if ((month == 1 || month == 3 || month == 5 || month == 6 || month == 7 || month == 8 || month == 10) && day > 31) {
                status.message = "Selected month has only 31 days";
            }

            //valid month
            else {
                status.isValid = true;
                status.message = "Valid month";
            }
        }
    }

    else {
        if (isNaN(day)) { status.message = 'Please enter a number for day of birth'; }
        else if (day <= 0) { status.message = 'Day of birth must be greater than zero'; }
        else if (isNaN(month)) { status.message = 'Please enter a number for month of birth'; }
        else if (month <= 0) { status.message = 'Month of birth must be greater than zero'; }
        else if (isNaN(year)) { status.message = 'Please enter a number for year of birth'; }
        else { status.message = 'Year of birth must be greater than zero'; }
    }
    
    return status;
}


//generate a new matric number for the student
var newMatricNo = function newMatricNo(student, allStudents) {
    var matricNo;
    
    //first three letters of department and to first digit of level
    var startValue = student.Department.substr(0, 3);
    startValue = startValue.toUpperCase() + (student.Level / 100);
    var endValue = 1;                                               //initial value of post-fix number
    
    //loop through all students
    for (var i = 0; i < allStudents.length; i++) {
        matricNo = allStudents[i].MatricNo;
        
        if (matricNo.substr(0, 4) == startValue && parseInt(matricNo.substr(4, 3)) >= endValue) {
            endValue = parseInt(matricNo.substr(4, 3)) + 1;         //get Last matric number for dept and level and add 1
        }
    }
    
    //maximun of three digits
    endValue += "";                                                 //convert to string
    if (endValue.length == 1) { endValue = "00" + endValue; }
    else if (endValue.length == 2) { endValue = "0" + endValue; }
    
    matricNo = startValue + endValue;                               //concatenate values to form matric number
    
    return matricNo;
}


//to log errors to the console
var logError = function logError(err) {
    console.log('An error/exception has occured\n');
    console.log('Error Message: ' + err.message);
    console.log('Error StackTrace:' + err.stack + '\n');
}


module.exports = {
    isValidStudent: isValidStudent,
    newMatricNo: newMatricNo,
    logError: logError
}