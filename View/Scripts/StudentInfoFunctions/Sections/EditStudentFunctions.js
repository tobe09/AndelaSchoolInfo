//EDIT STUDENT INFORMATION SECTION

$(function (){
    /////////////////////////////////////////
    
    //executes when the link to edit a student is clicked
    $("#editLink").on("click", editStudentLink);
    $("#editLinkFooter").on("click", editStudentLink);
    
    //executes when the button to get a single student information for editing is clicked
    $("#btnShowStudentEdit").on("click", function () {
        var query = $("#txtShowStudentEdit").val();
        
        if (validSearchText(query)) {                                                   //check validity of entry
            var result = getOneStudent(query);                                          //get selected student
            
            if (typeof (result.Error) == "undefined") {
                $('#txtShowStudentEdit').val('');
                makeVisible("#editForm");
                makeInvisible('#editResult');
                
                //populate span and generate lists
                $('#guidEdit').text(result._id);
                $('#matNoEdit').text(result.MatricNo);
                $('#sNameEdit').val(result.LastName);
                $('#fNameEdit').val(result.FirstName);
                $('#mNameEdit').val(result.MiddleName);
                
                populateSelectFac('#facEdit', 'facListEdit');                           //generate faculties list from collection
                $('#facListEdit').val(result.Faculty);
                var fac = $('#facListEdit').val()//get faculty value
                populateSelectDept(fac, '#deptEdit', 'deptListEdit');                   //generate departments list from faculty
                $("#deptListEdit option").filter(function () {                          //set department select text option
                    return this.text == result.Department;
                }).prop('selected', true);
                var years = $('#deptListEdit').val()//get year value of selected department
                populateSelectLevel(years, '#levelEdit', 'levelListEdit');              //generate levels select list from department years      
                $('#levelListEdit').val(result.Level);
                
                //get date of birth values
                var dob = getDateArray(result.DateOfBirth);
                $('#dobDayEdit').val(dob[0]);
                $('#dobMonthEdit').val(dob[1]);
                $('#dobYearEdit').val(dob[2]);
                
                $('#phoneNoEdit').val(result.PhoneNo);
                $('#emailEdit').val(result.Email);
                message('#msgEdit', "Make Required modifications", "brown");
            }
            //error condition
            else {
                message('#msgEdit', result.Error, "red");
                makeInvisible("#editForm");
                makeInvisible('#editResult');
            }
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
        populateSelectDept(fac, '#deptEdit', 'deptListEdit');
        var years = $('#deptListEdit').val();
        populateSelectLevel(years, '#levelEdit', 'levelListEdit');
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
        repopulateDob('#dobDaySpanEdit', 'dobDayEdit', '#dobMonthEdit', '#dobYearEdit');
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
        var query = $('#guidEdit').text();
        
        var result = modifyStudent(query, studentInfo);
        
        if (typeof (result.Error) == "undefined") {
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
            message('#msgEdit', result.Error, "red");
            makeVisible("#editForm");
            makeInvisible('#editResult');
        }
    })
    
    /////////////////////////////////////////
})


//HELPER FUNCTION FOR SECTION

//function for edit student link click
function editStudentLink() {
    clearValues()
    hideAll();
    makeVisible("#editStudent");
    makeInvisible("#editForm");
    makeInvisible("#editResult");
    
    var ageRange = getAgeRange();
    acceptedYears('dobYearEdit', '#dobYearSpanEdit', ageRange);
    getMonths('dobMonthEdit', '#dobMonthSpanEdit');
    getDays('dobDayEdit', '#dobDaySpanEdit');
}