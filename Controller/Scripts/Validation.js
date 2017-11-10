//database's data
var Database = require('../../Model/Database.js');
var Faculties = Database.Faculties;
var Departments = Database.Departments;
var Levels = Database.Levels;


//validate student details using the student object
var isValidStudent = function isValidStudent(student) {
    var status = new Object();
    
    var lastNameValid = checkName(student.LastName, 'surname');
    var firstNameValid = checkName(student.FirstName, 'first name');
    var facultyValid = checkFaculty(student.Faculty);
    var deptValid = false;
    //if faculty is valid, check department's validity
    if (facultyValid) {                                                          
        deptValid = checkDepts(student.Department, student.Faculty);
    }
    var levelValid = checkLevel(student.Level);
    var emailValid = checkEmail(student.Email);
    var phoneNoValid = checkPhoneNo(student.PhoneNo);
    var dobValid = checkDob(student.Day, student.Month, student.Year);
    
    if (firstNameValid.isValid && lastNameValid.isValid && facultyValid.isValid && deptValid.isValid &&
         levelValid.isValid && emailValid.isValid && phoneNoValid.isValid && dobValid.isValid) {
        status.isValid = true;
        status.message = "Valid Student";
    }
    else {
        status.isValid = false;
        
        //return error message pertaining to invalid data entry
        if (!lastNameValid.isValid) {
            status.message = lastNameValid.message;
        }
        else if (!firstNameValid.isValid) {
            status.message = firstNameValid.message;
        }
        else if (!facultyValid.isValid) {
            status.message = facultyValid.message;
        }
        else if (!deptValid.isValid) {
            status.message = deptValid.message;
        }
        else if (!levelValid.isValid) {
            status.message = levelValid.message;
        }
        else if (!dobValid.isValid) {
            status.message = dobValid.message;
        }
        else if (!phoneNoValid.isValid) {
            status.message = phoneNoValid.message;
        }
        else if (!emailValid.isValid) {
            status.message = emailValid.message;
        }
        else {
            status.message = 'User input error has occured';
        }
    }
    
    return status;
}


//check if a valid name is sent (helper function)
var checkName = function checkName(name, nameType) {
    var status = new Object();                                                          //object representing success or failure status
    status.isValid = false;
    
    if (nameType == null || typeof (nameType) != 'string') nameType = 'name';
    
    name = name.trim();

    if (name.length <= 0) {
        status.message = 'Please enter your ' + nameType;
    }
    //name must contain at least 2 characters  
    else if (name.length <= 2) {
        status.message = pascalCase(nameType) + ' should consist of three or more characters';
    }
    //valid name
    else {
        status.isValid = true;
        status.message = "Valid " + nameType;
    }
    
    return status;
}


//loop through Faculties collection to validate faculty (helper function)
var checkFaculty = function checkFaculty(faculty) {
    var status = new Object();
    status.isValid = false;
    status.message = 'Invalid faculty. Faculty type is not registered';
    
    faculty = faculty.trim();

    if (faculty.length == 0) {
        status.message = "Please enter your faculty";
    }
    else {
        for (var i = 0; i < Faculties.length; i++) {
            
            if (Faculties[i].Faculty == faculty) {
                status.isValid = true;
                status.message = 'Valid faculty';
                break;
            }
        }
    }
    
    return status
}


//loop through Departments collection to validate department (helper function)
var checkDepts = function checkDepts(dept, fac) {
    var status = new Object();
    status.isValid = false;
    status.message = 'Invalid department. Department type does not exist for selected faculty';
    
    dept = dept.trim();

    if (dept.length == 0) {
        status.message = "Please enter your department";
    }
    else {
        for (var i = 0; i < Departments.length; i++) {
            
            if (Departments[i].Faculty == fac) {
                
                //check department under selected faculty
                for (var j = 0; j < Departments[i].Depts.length; j++) {
                    
                    if (Departments[i].Depts[j].Department == dept) {
                        status.isValid = true;
                        status.message = 'Valid department';
                        break;
                    }
                }
                break;
            }
        }
    }
    
    return status
}


//loop through Levels collection to validate level (helper function)
var checkLevel = function checkLevel(level) {
    var status = new Object();
    status.isValid = false;
    status.message = 'Invalid level. Selected level is not registered';
    
    level = level.trim();

    if (level.length == 0) {
        status.message = "Please enter a level";
    }
    
    else {
        
        for (var i = 0; i < Levels.length; i++) {
            if (Levels[i].Level == level) {
                status.isValid = true;
                status.message = 'Valid level';
                break;
            }
        }
    }
    
    return status
}


//to validate email address (helper function)
var checkEmail = function checkEmail(email) {
    var status = new Object();
    var emailRegEx = new RegExp("^(\\w)+@(\\w)+\\.(\\w)+$");                 //regular expression matching a standard email address
    
    email = email.trim();

    status.isValid = new RegExp(emailRegEx).test(email);
    
    if (email.length == 0) {
        status.message = 'Please enter your email address';
    }
    else if (!status.isValid) {
        status.message = 'Invalid email address format';
    }
    else {
        status.message = 'Valid email address';
    }
    
    return status;
}


//to validate phone number (phone number can start with a "+" sign) (helper function)
var checkPhoneNo = function checkPhoneNo(phoneNo) {
    var status = new Object();
    var phoneNoRegEx = new RegExp("^\\+?[\\d]{7,16}$");                              //regular expression matching a standard phone number with an optional '+'
    
    phoneNo = phoneNo.trim();

    status.isValid = phoneNoRegEx.test(phoneNo);
    
    if (phoneNo.length == 0) {
        status.message = 'Please enter your phone number';
    }
    else if (!status.isValid) {
        status.message = 'Invalid phone number';
    }
    else {
        status.message = 'Valid phone number';
    }
    
    return status;
}


//accepted age range for students
var ageRange = { minAge: 16, maxAge: 70 };


//check date of birth for validity using a gregorian calender (helper function)
var checkDob = function checkDob(day, month, year) {
    var status = new Object();
    status.isValid = false
    
    var day = parseInt(day);
    var month = parseInt(month);
    var year = parseInt(year);
    
    //check validity of individual entries
    if (!isNaN(day) && !isNaN(month) && !isNaN(year) && (day > 0) && (month > 0 && month <= 12) && (year < new Date().getFullYear())) {
        
        //get milliseconds gap between birth date and today's date and convert to years
        var age = new Date() - new Date(year, month - 1, day);
        age = age / (1000 * 60 * 60 * 24 * 365.2425);
        
        //to account for student age with respect to the present
        if (age < ageRange.minAge || age > ageRange.maxAge) {
            
            if (age < ageRange.minAge) {
                status.message = "Student is too young (Age: " + parseInt(age) + "). Student should be between 16 and 70 years of age";
            }
            else {
                status.message = "Student is too old (Age: " + parseInt(age) + "). Student should be between 16 and 70 years of age";
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
            else if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
                status.message = "Selected month has only 31 days";
            }

            //valid month (executed after all checks has been passed)
            else {
                status.isValid = true;
                status.message = "Valid month";
            }
        }
    }

    else {
        if (isNaN(day)) {
            status.message = 'Please enter a number for day of birth';
        }
        else if (day <= 0 || day > 31) {
            status.message = 'Please enter a valid day of birth (day of birth cannot be negative)';
        }
        else if (isNaN(month)) {
            status.message = 'Please enter a number for month of birth';
        }
        else if (month <= 0 || month > 12) {
            status.message = 'Please enter a valid month of birth (i.e. between 1 to 12 inclusive)';
        }
        else if (isNaN(year)) {
            status.message = 'Please enter a number for year of birth';
        }
        else {
            status.message = 'Please enter a valid year of birth (i.e. cannot be greater than current year)';
        }
    }
    
    return status;
}


//function to generate a new matric number for the student
var newMatricNo = function newMatricNo(preMatricNo, matchingStudents) {
    var matricNo = preMatricNo;                                         //set initial value of matriculation number

    var postMatricNo = 1;                                               //initial value of post-fix value of matric number
    
    //loop through all students in selected department and level
    for (var i = 0; i < matchingStudents.length; i++) {
        var existMatricNo = matchingStudents[i].MatricNo;
        
        if (parseInt(existMatricNo.substr(5, 3)) >= postMatricNo) {     //compare last 3 digits of matric number to set value
            postMatricNo = parseInt(existMatricNo.substr(5, 3)) + 1;    //get numeric part of last matric number for dept and level and add 1
        }
    }
    
    //maximun of three digits length
    postMatricNo += "";                                                 //convert to string
    if (postMatricNo.length == 1) {
        postMatricNo = "00" + postMatricNo;
    }
    else if (postMatricNo.length == 2) {
        postMatricNo = "0" + postMatricNo;
    }
    
    matricNo += postMatricNo;                                           //concatenate values to form matric number
    
    return matricNo;
}


//function to get the prefix of a department
var deptPrefix = function deptPrefix(dept, fac) {
    var departmentPrefix

    //get department for selected faculty
    for (var i = 0; i < Departments.length; i++) {
        
        if (Departments[i].Faculty == fac) {
            
            //check for department in department array under selected faculty
            for (var j = 0; j < Departments[i].Depts.length; j++) {

                if (Departments[i].Depts[j].Department == dept) {
                    departmentPrefix = Departments[i].Depts[j].Prefix;          //get the department prefix
                    break;
                }
            }
            
            break;
        }
    }
    
    return departmentPrefix; 
}


//function to convert a string to pascal casing (with the first letter capitalized and other letters in lower case)
var pascalCase = function pascalCase(name){
    var modifiedName;
    modifiedName = name.substr(0, 1).toUpperCase();
    modifiedName += name.substr(1).toLowerCase();
    return modifiedName;
}


//function to log errors to the console
var logError = function logError(err) {
    console.log('An error/exception has occured\n');
    console.log('Error Message: ' + err.message);
    console.log('Error StackTrace:' + err.stack + '\n');
}


//export functions needed externally
module.exports = {
    isValidStudent: isValidStudent,
    ageRange: ageRange,
    deptPrefix: deptPrefix,
    newMatricNo: newMatricNo,
    pascalCase: pascalCase,
    logError: logError
}