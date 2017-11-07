//function which returns all students information in the database
function getAllStudents(callBackMethodName) {
    
    $.ajax({
        type: "GET",
        url: "/Students",
        success: function (students) {
            callBackDispatcher(callBackMethodName, students);
        },
        error: function () {
            callBackDispatcher(callBackMethodName);
        }
    })
    
}


//function which returns a single student information from the database
function getOneStudent(query, callBackMethodName) {
    
    $.ajax({
        type: "GET",
        url: "/Students/" + query,
        success: function (student) {
            callBackDispatcher(callBackMethodName, student);
        },
        error: function () {
            callBackDispatcher(callBackMethodName);
        }
    })
    
}


//function to add a student to database
function addStudent(studentInfo, callBackMethodName){

    $.ajax({
        type: "POST",
        url: "/Students",
        data: studentInfo,
        success: function (addedStudent) {
            callBackDispatcher(callBackMethodName, addedStudent);
        },
        error: function () {
            callBackDispatcher(callBackMethodName);
        }
    })

}


//function to modify a student in the database
function modifyStudent(query, modifiedStudentInfo, callBackMethodName){
    
    $.ajax({
        type: "PUT",
        url: "Students/" + query,
        data: modifiedStudentInfo,
        success: function (modifiedStudent) {
            callBackDispatcher(callBackMethodName, modifiedStudent);
        },
        error: function () {
            callBackDispatcher(callBackMethodName);
        }
    })

}


//function to delete a student from the database
function deleteStudent(query, callBackMethodName) {
    
    $.ajax({
        type: "DELETE",
        url: "Students/" + query,
        success: function (deletedStudent) {
            callBackDispatcher(callBackMethodName, deletedStudent);
        },
        error: function () {
            callBackDispatcher(callBackMethodName);
        }
    })

}


//Functions that query existing objects in the web server (since the database is not queried, asynchrony is not a necessity)

//function to get all faculties  (asynchronously called)
function getFac(callBackMethodName) {
    var allFaculties;
    
    $.ajax({
        type: "GET",
        url: "dbTables/faculties",
        success: function (allFacs) {
            callBackDispatcher(callBackMethodName, allFacs);
        },
        error: function (){
            callBackDispatcher(callBackMethodName);
        }
    });                                          
};


//function to get all departments (synchronously called)
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


//function to get acceptable age range (synchronously called)
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




