$(function () {    
    //ADD STUDENT SECTION
    
    //excutes when the link to add a student is clicked
    $("#addLink").on("click", addStudentLink);
    $("#addLinkFooter").on("click", addStudentLink);
    
    //executes when the selected faculty option (for add student page) is changed
    $(document.body).on('change', "#facListAdd", function (e) {
        e.preventDefault();                                         //prevent default behaviour
        var fac = $("#facListAdd").val();                           //get selected faculty value
        populateSelectDept(fac, '#deptAdd', 'deptListAdd');         //populate department select list
        var years = $('#deptListAdd').val();                        //get number of years for course
        populateSelectLevel(years, '#levelAdd', 'levelListAdd');    //populate level select list 
    })
    
    //executes when the selected department option (for add student page) is changed
    $(document.body).on('change', "#deptListAdd", function (e) {
        e.preventDefault();
        var years = $('#deptListAdd').val();
        populateSelectLevel(years, '#levelAdd', 'levelListAdd');
    })
    
    //executes when the year of birth (for add student page) is changed
    $(document.body).on('change', "#dobYearAdd", function (e) {
        e.preventDefault();
        repopulateDob('#dobDaySpanAdd', 'dobDayAdd', '#dobMonthAdd', '#dobYearAdd');
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
        
        var result = addStudent(studentInfo);

        if (typeof (result.Error) == "undefined") {
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
            $('#dobDayAdd').val('');
            $('#dobMonthAdd').val('');
            $('#dobYearAdd').val('');
            $('#phoneNoAdd').val('');
            $('#emailAdd').val('');
        }
        else {
            message('#msgAdd', result.Error, "red");                    //display error message from server
            //hide and show necessary divs
            makeInvisible("#divResultAdd");
            makeVisible("#divFormAdd");
        }
        return false;                                                           //avoid default behaviour
    })
    
    
    $("#addAnother").on("click", function () {
        makeInvisible("#divResultAdd");
        makeVisible("#divFormAdd");
        message('#msgAdd', '');
    })
    
    /////////////////////////////////////////
})


//HELPER FUNCTION FOR SECTION

//function for add student link click
function addStudentLink() {
    clearValues()
    hideAll();
    makeVisible("#addStudent");
    makeVisible("#divFormAdd");
    makeInvisible("#divResultAdd");
    
    populateSelectFac('#facAdd', 'facListAdd');
    var fac = $('#facListAdd').val();
    populateSelectDept(fac, '#deptAdd', 'deptListAdd');
    var years = $('#deptListAdd').val();
    populateSelectLevel(years, '#levelAdd', 'levelListAdd');
    
    debugger
    var ageRange = getAgeRange();
    acceptedYears('dobYearAdd', '#dobYearSpanAdd', ageRange);                   //get select list with all expected birth years of student
    getMonths('dobMonthAdd', '#dobMonthSpanAdd');                               //get select list with all the months in a year
    getDays('dobDayAdd', '#dobDaySpanAdd');                                     //get select list with all the days in a month
}