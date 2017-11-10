//ADD STUDENT SECTION

$(function () {
    ///////////////////////////////////////////

    //excutes when the link to add a student is clicked
    $("#addLink").on("click", addStudentLinkClick);
    $("#addLinkFooter").on("click", addStudentLinkClick);
    

    //executes when the selected faculty option (for add student page) is changed- for department and level
    $(document.body).on('change', "#facListAdd", function (e) {
        e.preventDefault();                                         //prevent default behaviour
        var fac = $("#facListAdd").val();                           //get selected faculty value

        getDept(function (allDepartments) {
            if (allDepartments != null) {
                populateSelectDept(fac, '#deptAdd', 'deptListAdd', allDepartments);         //populate department select list
                var years = $('#deptListAdd').val();                        //get number of years for course
                populateSelectLevel(years, '#levelAdd', 'levelListAdd');    //populate level select list 
            }
            else {
                message('#msgAdd', ajaxErrMsg, "red");                      //display error message pertaining to ajax call
            }
        });
    })
    

    //executes when the selected department option (for add student page) is changed- for level
    $(document.body).on('change', "#deptListAdd", function (e) {
        e.preventDefault();
        var years = $('#deptListAdd').val();
        populateSelectLevel(years, '#levelAdd', 'levelListAdd');
    })
    

    //executes when the year of birth (for add student page) is changed
    $(document.body).on('change', "#dobYearAdd", function (e) {
        e.preventDefault();
        repopulateDob('#dobDaySpanAdd', 'dobDayAdd', '#dobMonthAdd', '#dobYearAdd');            //to change the dates available according to the month and year
    })
    

    //executes when the month of birth (for add student page) is changed
    $(document.body).on('change', "#dobMonthAdd", function (e) {
        e.preventDefault();
        repopulateDob('#dobDaySpanAdd', 'dobDayAdd', '#dobMonthAdd', '#dobYearAdd');
    })
    

    //executes when a student is to be added
    $("#btnAddSubmit").on("click", function () {
        //initialize student information for submission/posting
        var studentInfo = {
            FirstName: $('#fNameAdd').val(),
            LastName: $('#lNameAdd').val(),
            MiddleName: $('#mNameAdd').val(),
            Faculty: $('#facListAdd').val(),
            Department: $('#deptListAdd option:selected').text(),
            Level: $('#levelListAdd').val(),
            Day: $('#dobDayAdd').val(),
            Month: $('#dobMonthAdd').val(),
            Year: $('#dobYearAdd').val(),
            Email: $('#emailAdd').val(),
            PhoneNo: $('#phoneNoAdd').val()
        }
        
        addStudent(studentInfo, 'addStudentCallBack');                               //ajax call to post student information to the server
        return false;                                                               //to avoid default post back behaviour
    })
    
    
    //executes to enable addition of a new student
    $("#addAnother").on("click", function () {
        makeInvisible("#divResultAdd");
        makeVisible("#divFormAdd");
        message('#msgAdd', '');
    })
    
    /////////////////////////////////////////
})


//function for add student link click
function addStudentLinkClick() {
    clearValues()
    hideAll();
    makeVisible("#addStudent");
    makeVisible("#divFormAdd");
    makeInvisible("#divResultAdd");
    
    getFac(function (allFaculties) {
        
        if (allFaculties != null) {           //no error from asynchronous call
            //check if select dropdown list has been populated
            if ($('#facAdd').text() == "") {
                populateSelectFac('#facAdd', 'facListAdd', allFaculties);
                var fac = $('#facListAdd').val();
                
                getDept(function (allDepartments) {
                    
                    if (allDepartments != null) {
                        populateSelectDept(fac, '#deptAdd', 'deptListAdd', allDepartments);
                        var years = $('#deptListAdd').val();
                        populateSelectLevel(years, '#levelAdd', 'levelListAdd');
                        
                        //check if date of birth select list has been populated
                        if ($('#dobYearSpanAdd').text() == "") {
                            getAcceptedYears('dobYearAdd', '#dobYearSpanAdd');                          //get select list with all expected birth years of student
                            getMonths('dobMonthAdd', '#dobMonthSpanAdd');                               //get select list with all the months in a year
                            getDays('dobDayAdd', '#dobDaySpanAdd');                                     //get select list with all the days in a month
                        }
                    }
                    else {
                        message('#msgAdd', ajaxErrMsg, "red");                      //display error message pertaining to ajax call
                    }
                });
            }
        }

        else {
            message('#msgAdd', ajaxErrMsg, "red");                      //display error message pertaining to ajax call
        }
    });
}


//callback function for added student
function addStudentCallBack(result) {
    
    if (result != null && typeof (result.Error) == "undefined") {
        //hide and show necessary divs
        makeVisible("#divResultAdd");
        makeInvisible("#divFormAdd");
        
        //populate table with added information
        $('#addStdId').text(result._id);
        $('#matNoAddRes').text(result.MatricNo);
        $('#lNameAddRes').text(result.LastName);
        $('#oNameAddRes').html(result.FirstName + "&nbsp;" + result.MiddleName);
        $('#facAddRes').text(result.Faculty);
        $('#deptAddRes').text(result.Department);
        $('#levelAddRes').text(result.Level);
        var dob = formatDate(result.DateOfBirth);
        $('#dobAddRes').text(dob);
        $('#phoneNoAddRes').text(result.PhoneNo);
        $('#emailAddRes').text(result.Email);
        dob = formatDate(result.DateReg);
        $('#dRegAddRes').text(dob);
        message('#msgAdd', "Student has been successfully added", "green");
        
        //clear addition form
        $('#lNameAdd').val('');
        $('#fNameAdd').val('');
        $('#mNameAdd').val('');
        $('#phoneNoAdd').val('');
        $('#emailAdd').val('');
    }
    else {
        //hide and show necessary divs
        makeInvisible("#divResultAdd");
        makeVisible("#divFormAdd");

        if (result == null) {
            message('#msgAdd', ajaxErrMsg, "red");                      //display error message pertaining to ajax call
        }
        else {
            message('#msgAdd', result.Error, "red");                    //display error message from server
        }
    }                                               
}