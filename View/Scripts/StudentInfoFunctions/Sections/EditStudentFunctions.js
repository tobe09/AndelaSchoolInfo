//EDIT STUDENT INFORMATION SECTION

$(function (){
    /////////////////////////////////////////
    
    //executes when the link to edit a student is clicked
    $("#editLink").on("click", editStudentLinkClick);
    $("#editLinkFooter").on("click", editStudentLinkClick);
    
    //executes when the button to get a single student information for editing is clicked
    $("#btnShowStudentEdit").on("click", function () {
        var query = $("#txtShowStudentEdit").val();
        
        if (validSearchText(query)) {                                                   //check validity of entry
            getOneStudent(query, 'editStudentShowCallBack');                            //get selected student
        }
        //invalid query entered by used
        else {
            message('#msgEdit', "Please enter a valid matriculation number", "red");
            makeInvisible("#editForm");
            makeInvisible('#editResult');
        }
    })
    
    //executes when the selected faculty option (for edit student page) is changed
    $(document.body).on('change', "#facListEdit", function (e) {
        e.preventDefault();
        var fac = $("#facListEdit").val();
        
        getDept(function (allDepartments) {
            if (allDepartments != null) {
                populateSelectDept(fac, '#deptEdit', 'deptListEdit', allDepartments);
                var years = $('#deptListEdit').val();
                populateSelectLevel(years, '#levelEdit', 'levelListEdit');
            }
            else {
                message('#msgEdit', ajaxErrMsg, "red");                      //display error message pertaining to ajax call
            }
        });
    })
    
    //executes when the selected department option (for edit student page) is changed
    $(document.body).on('change', "#deptListEdit", function (e) {
        e.preventDefault();
        var years = $('#deptListEdit').val();
        populateSelectLevel(years, '#levelEdit', 'levelListEdit');
    })
    
    //executes when the year of birth (for edit student page) is changed
    $(document.body).on('change', "#dobYearEdit", function (e) {
        e.preventDefault();
        repopulateDob('#dobDaySpanEdit', 'dobDayEdit', '#dobMonthEdit', '#dobYearEdit');        //function to repopulate date of birth options according to changes made
    })
    
    //executes when the month of birth (for edit student page) is changed
    $(document.body).on('change', "#dobMonthEdit", function (e) {
        e.preventDefault();
        repopulateDob('#dobDaySpanEdit', 'dobDayEdit', '#dobMonthEdit', '#dobYearEdit');
    })
    
    //eecutes after modification of student information
    $("#btnEditSubmit").on("click", function () {
        var studentInfo = {
            FirstName: $('#fNameEdit').val(),
            LastName: $('#sNameEdit').val(),
            MiddleName: $('#mNameEdit').val(),
            Faculty: $('#facListEdit').val(),
            Department: $('#deptListEdit option:selected').text(),
            Level: $('#levelListEdit').val(),
            Day: $('#dobDayEdit').val(),
            Month: $('#dobMonthEdit').val(),
            Year: $('#dobYearEdit').val(),
            Email: $('#emailEdit').val(),
            PhoneNo: $('#phoneNoEdit').val()
        }
        var query = $('#guidEdit').text();                                              //get student's unique id
        
        modifyStudent(query, studentInfo, 'editStudentResultCallBack');
        return false                                                                    //to avoid page reload on 'put'
    })
    
    /////////////////////////////////////////
})


//HELPER FUNCTION FOR SECTION

//function for edit student link click
function editStudentLinkClick() {
    clearValues()
    hideAll();
    makeVisible("#editStudent");
    makeInvisible("#editForm");
    makeInvisible("#editResult");
}

//callback function to display student details to be modified
function editStudentShowCallBack(result) {
    
    if (result != null && typeof (result.Error) == "undefined") {
        $('#txtShowStudentEdit').val('');
        makeVisible("#editForm");
        makeInvisible('#editResult');
        
        //populate span and generate lists
        $('#guidEdit').text(result._id);
        $('#matNoEdit').text(result.MatricNo);
        $('#sNameEdit').val(result.LastName);
        $('#fNameEdit').val(result.FirstName);
        $('#mNameEdit').val(result.MiddleName);
        
        getFac(function (allFaculties) {
            
            if (allFaculties != null) {       //no error from asynchronous call
                //repopulate faculty select list from server if it has not been generated
                if ($('#facEdit').text() == "") {
                    populateSelectFac('#facEdit', 'facListEdit', allFaculties);                 //generate faculties list from collection
                }
                
                $('#facListEdit').val(result.Faculty);                                   //set list to student's faculty
                
                getDept(function (allDepartments) {
                    
                    if (allDepartments != null) {
                        populateSelectDept(result.Faculty, '#deptEdit', 'deptListEdit', allDepartments);         //generate departments list from faculty
                        $("#deptListEdit option").filter(function () {                                                  //set department select text option
                            return this.text == result.Department;
                        }).prop('selected', true);
                        var years = $('#deptListEdit').val()//get year value of selected department
                        populateSelectLevel(years, '#levelEdit', 'levelListEdit');              //generate levels select list from department years   
                        $('#levelListEdit').val(result.Level);
                        //check if year of birth list has been generated before populating
                        if ($('#dobYearSpanEdit').text() == "") {
                            getAcceptedYears('dobYearEdit', '#dobYearSpanEdit');
                            getMonths('dobMonthEdit', '#dobMonthSpanEdit');
                            getDays('dobDayEdit', '#dobDaySpanEdit');
                        }
                        
                        //get date of birth values
                        var dob = getDateArray(result.DateOfBirth);
                        $('#dobDayEdit').val(dob[0]);
                        $('#dobMonthEdit').val(dob[1]);
                        $('#dobYearEdit').val(dob[2]);
                        
                        $('#phoneNoEdit').val(result.PhoneNo);
                        $('#emailEdit').val(result.Email);
                        message('#msgEdit', "Make Required modifications", "brown");
                    }
                    else {
                        message('#msgEdit', ajaxErrMsg, "red");                      //display error message pertaining to ajax call
                    }
                });
            }

            else {
                message('#msgEdit', ajaxErrMsg, "red");
            }
        });
    }
    //error condition
    else {
        makeInvisible("#editForm");
        makeInvisible('#editResult');
        
        if (result == null) {
            message('#msgEdit', ajaxErrMsg, "red");
        }
        else {
            message('#msgEdit', result.Error, "red");
        }
    }
}

//callback function to show results of modification
function editStudentResultCallBack(result) {
    
    if (result != null && typeof (result.Error) == "undefined") {
        makeInvisible("#editForm");
        makeVisible('#editResult');
        $('#guidEditRes').text(result._id);
        $('#matNoEditRes').text(result.MatricNo);
        $('#sNameEditRes').text(result.LastName);
        $('#othNameEditRes').html(result.FirstName + "&nbsp;" + result.MiddleName);
        $('#facEditRes').text(result.Faculty);
        $('#deptEditRes').text(result.Department);
        $('#levelEditRes').text(result.Level);
        var dob = formatDate(result.DateOfBirth);
        $('#dobEditRes').text(dob);
        $('#phoneNoEditRes').text(result.PhoneNo);
        $('#emailEditRes').text(result.Email);
        message('#msgEdit', "Student information has been successfully modified", "green");
    }
    else {
        makeVisible("#editForm");
        makeInvisible('#editResult');

        if (result == null) {
            message('#msgEdit', ajaxErrMsg, "red");
        }
        else {
            message('#msgEdit', result.Error, "red");
        }
    }
}