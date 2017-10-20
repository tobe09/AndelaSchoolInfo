//function which returns all students information in the database
function getAllStudents() {
    var allStudents;
    
    $.ajax({
        type: "GET",
        url: "/Students",
        async: false,
        success: function (students) {
            allStudents = students;
        }
    })
    
    return allStudents;
}


//function which returns a single student information from the database
function getOneStudent(query) {
    var student;
    
    $.ajax({
        type: "GET",
        url: "/Students/" + query,
        async: false,
        success: function (studnt) {
            student = studnt;
        }
    })
    
    return student;
}


//function to add a student to database
function addStudent(studentInfo){
    var student;

    $.ajax({
        type: "POST",
        url: "/Students",
        data: studentInfo,
        async: false,
        success: function (studnt) {
            student = studnt;
        }
    })

    return student;
}


//function to modify a student in the database
function modifyStudent(query, modifiedStudentInfo){
    var student;
    
    $.ajax({
        type: "PUT",
        url: "Students/" + query,
        data: modifiedStudentInfo,
        async: false,
        success: function (studnt) {
            student = studnt;
        }
    })

    return student
}


//function to delete a student from the database
function deleteStudent(query) {
    var student;
    
    $.ajax({
        type: "DELETE",
        url: "Students/" + query,
        async: false,
        success: function (studnt) {
            student = studnt;
        }
    })

    return student
}


//function to get all departments
function getDept() {
    var allDepartments
    
    $.ajax({
        type: "GET",
        url: "dbTables/departments",
        async: false,
        success: function (allDepts) {
            allDepartments = allDepts;
        }
    });
    
    return allDepartments;                                               //return all departments
}


//function to get all faculties
function getFac() {
    var allFaculties;
    
    $.ajax({
        type: "GET",
        url: "dbTables/faculties",
        async: false,
        success: function (allFacs) {
            allFaculties = allFacs;                             //an array of all faculties
        }
    });
    
    return allFaculties;                                        //return all faculties          
};


//function to get acceptable age range
function getAgeRange(){
    var ageRange;

    $.ajax({
        type: "GET",
        url: "dbTables/ageRange",
        async: false,
        success: function (ageRng) {
            ageRange = ageRng;                                    //an object with minimum and maximum age
        }
    });

    return ageRange;
}