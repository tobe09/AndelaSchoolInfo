//called to display only home page when page is initially loaded
window.onload = pageLoad();


$(function () {
    
    //HOME SECTION
    //executes when the home link is clicked
    $("#homeLink").on("click", pageLoad);
    $("#homeLinkFooter").on("click", pageLoad);
    
    /////////////////////////////////////////
    
    
    //ALL STUDENTS SECTION
    //executes when all students link is clicked
    $("#allLink").on("click", allStudentsLink)
    $("#allLinkFooter").on("click", allStudentsLink)
    
    /////////////////////////////////////////
    
    
    //GET ONE STUDENT SECTION
    //executes when one student link is clicked
    $("#oneLink").on("click", oneStudentLink)
    $("#oneLinkFooter").on("click", oneStudentLink)
    
    //executes when the selected faculty option (for add student page) is changed
    $(document.body).on('change', "#allStudentListOne", function (e) {
        e.preventDefault();                                             //get sudent identifier from student select list
        var query = $("#allStudentListOne").val();                      //get sudent identifier from student select list
        
        if (query != '0') {
            getOneStudent(query);                                       //get selected student
        }
        else {
            makeInvisible('#oneResult');                                //hide result div
            message("#msgOne", '');                                     //clear message
        }
        
        $('#txtIdOne').val('');                                         //reset text input             
    })
    
    //executes when the button to display single student is clicked
    $("#btnStudentOne").on("click", function () {
        var query = $("#txtIdOne").val();                               //get sudent identifier from input textbox
        
        if (validSearchText(query)) {                                   //check validity of entry
            getOneStudent(query);                                       //get student using text
        }
        else {
            message("#msgOne", "Please enter a valid matriculation number", 'red');
            makeInvisible('#oneResult');                                //hide result div
        }
        $('#allStudentListOne').val('0');                               //reset select list
    })
    
    //function to display the information of selected student
    function getOneStudent(query) {
        $.ajax({
            type: "GET",
            url: "/Students/" + query,
            success: function (student) {
                
                if (typeof (student.Error) == "undefined") {
                    makeVisible('#oneResult');                          //show result
                    
                    //populate table with information
                    $('#guidOne').text(student._id);
                    $('#matNoOne').text(student.MatricNo);
                    $('#lNameOne').text(student.LastName);
                    $('#othName').html(student.FirstName + "&nbsp;" + student.MiddleName);
                    $('#facOne').text(student.Faculty);
                    $('#deptOne').text(student.Department);
                    $('#levelOne').text(student.Level);
                    var dob = formatDate(student.DateOfBirth);          //format date of birth as string
                    $('#dobOne').text(dob);
                    $('#phoneNoOne').text(student.PhoneNo);
                    $('#emailOne').text(student.Email);
                    dob = formatDate(student.DateReg);
                    $('#dRegOne').text(dob);
                    
                    message("#msgOne", 'Selected student information successfully generated', 'green');
                }
                else {
                    message("#msgOne", student.Error, 'red');
                    makeInvisible('#oneResult');
                }
            }
        })
    }
    /////////////////////////////////////////
    
    
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
        
        $.ajax({
            type: "POST",
            url: "/Students",
            data: studentInfo,
            success: function (result) {

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
            }
        })
        return false;                                                           //avoid default behaviour
    })
    
    
    $("#addAnother").on("click", function () {
        makeInvisible("#divResultAdd");
        makeVisible("#divFormAdd");
        message('#msgAdd', '');
    })
    
    /////////////////////////////////////////
    
    
    //EDIT STUDENT INFORMATION SECTION
    //executes when the link to edit a student is clicked
    $("#editLink").on("click", editStudentLink);
    $("#editLinkFooter").on("click", editStudentLink);
    
    //executes when the button to get a single student information for editing is clicked
    $("#btnShowStudentEdit").on("click", function () {
        var query = $("#txtShowStudentEdit").val();
        
        if (validSearchText(query)) {                                          //check validity of entry
            
            $.ajax({
                type: "GET",
                url: "/Students/" + query,
                success: function (result) {
                    
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
                        var fac = $('#facListEdit').val()                                       //get faculty value
                        populateSelectDept(fac, '#deptEdit', 'deptListEdit');                   //generate departments list from faculty
                        $("#deptListEdit option").filter(function () {                          //set department select text option
                            return this.text == result.Department;
                        }).prop('selected', true);      
                        var years= $('#deptListEdit').val()                                     //get year value of selected department
                        populateSelectLevel(years, '#levelEdit', 'levelListEdit');              //generate levels select list from department years      
                        $('#levelListEdit').val(result.Level);
                        
                        //get date of birth values
                        var dob = getDateInt(result.DateOfBirth);
                        $('#dobDayEdit').val(dob[0]);
                        $('#dobMonthEdit').val(dob[1]);
                        $('#dobYearEdit').val(dob[2]);
                        
                        $('#phoneNoEdit').val(result.PhoneNo);
                        $('#emailEdit').val(result.Email);
                        message('#msgEdit', "Make Required modifications", "brown");
                    }
                    else {
                        message('#msgEdit', result.Error, "red");
                        makeInvisible("#editForm");
                        makeInvisible('#editResult');
                    }
                }
            })
        }
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
        
        $.ajax({
            type: "PUT",
            url: "Students/" + query,
            data: studentInfo,
            success: function (result) {

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
            }
        })
        return false;
    })
    
    /////////////////////////////////////////
    
    
    //DELETE STUDENT SECTION
    //executes when the link to delete is clicked
    $("#deleteLink").on("click", deleteStudentLink);
    $("#deleteLinkFooter").on("click", deleteStudentLink);
    
    //executes when the button to show student to be deleted is clicked
    $("#btnDelShow").on("click", function () {
        var query = $("#txtDelStudent").val();
        
        if (validSearchText(query)) {
            $.ajax({
                type: "GET",
                url: "Students/" + query,
                async: false,
                success: function (result) {

                    if (typeof (result.Error) == "undefined") {
                        $('#txtDelStudent').val('');
                        $('#matNoTd').removeClass('info').addClass('warning');

                        makeVisible('#headerInfoDel');
                        makeInvisible('#headerResDel');
                        makeVisible('#delResult');
                        makeVisible('#btnDelSubmit');

                        $('#delResultInfo').text("Student Details");
                        $('#guidDel').text(result._id);
                        $('#matNoDel').text(result.MatricNo);
                        $('#sNameDel').text(result.LastName);
                        $('#othNameDel').html(result.FirstName + '&nbsp;' + result.MiddleName);
                        $('#facDel').text(result.Faculty);
                        $('#deptDel').text(result.Department);
                        $('#levelDel').text(result.Level);
                        var dob = formatDate(result.DateOfBirth);
                        $('#dobDel').text(dob);
                        $('#phoneNoDel').text(result.PhoneNo);
                        $('#emailDel').text(result.Email);
                        dob = formatDate(result.DateReg);
                        $('#dRegDel').text(dob);
                        message('#msgDel', 'Click "Delete Student" Button to Delete Student', "brown");
                    }
                    else {
                        message('#msgDel', result.Error, "red");
                        makeInvisible('#delResult');
                    }
                }
            })
        }
        else {
            message('#msgDel', "Please enter a valid matriculation number", "red");
            makeInvisible('#delResult');
        }
    })
    
    //executes when the button to show student to be deleted is clicked
    $("#btnDelSubmit").on("click", function () {
        var query = $("#guidDel").text();
        $.ajax({
            type: "DELETE",
            url: "Students/" + query,
            async: false,
            success: function (result) {
                $('#matNoTd').removeClass('warning').addClass('info');
                makeVisible('#headerResDel');
                makeInvisible('#headerInfoDel');
                makeInvisible('#btnDelSubmit');
                message('#msgDel', 'Student has been Deleted from the Database', 'green');
            }
        })
    })
    
    /////////////////////////////////////////
    
    
    //ABOUT SECTION
    //executes  when the about link is clicked
    $("#aboutLink").on("click", aboutLink)
    $("#aboutLinkFooter").on("click", aboutLink)

    /////////////////////////////////////////
})


//LINK CLICK FUNCTIONS

var errMsg = 'User Input error has occured';

//hides all divs
function hideAll() {
    makeInvisible('#home')
    makeInvisible('#allStudents');
    makeInvisible('#oneStudent');
    makeInvisible('#addStudent');
    makeInvisible('#editStudent');
    makeInvisible('#deleteStudent');
    makeInvisible('#about');
}

//displays only the home page
function pageLoad() {
    clearValues()
    hideAll();
    makeVisible('#home')
}

//function for all students link click
function allStudentsLink() {
    clearValues()
    hideAll();
    makeVisible("#allStudents");
    
    $.ajax({
        type: "GET",
        url: "/Students",
        success: function (students) {
            
            //genarate and draw table of all students
            if (students.length > 0) {
                message('#allStudentNo', students.length, 'brown');
                
                var output = '<table id="allTable" class="table table-striped table-responsive text-center">';
                output += '<thead> <tr> <th class="text-center">S/N</th> <th class="text-center largeFont">Students Information</th> </tr> </thead> <tbody>';
                
                for (var i = 0; i < students.length; i++) {
                    output += '<tr>  <td class="largeFont">' + (i + 1) + '</td>';
                    output += '<td> <table class="table"> <tbody>';
                    output += '<tr class="success"> <td> <em>Name</em></td> <td>' + students[i].LastName + ',&nbsp;' +
                     students[i].FirstName + '&nbsp;' + students[i].MiddleName + '</td></tr>';
                    output += '<tr class="info"> <td> <em>Matriculation Number</em></td>  <td>' + students[i].MatricNo + '</td> </tr>';
                    output += '<tr> <td><em>Student Unique ID</em></td> <td>' + students[i]._id + '</td> </tr>';
                    output += '<tr> <td> <em>Faculty</em></td> <td>' + students[i].Faculty + '</td> </tr>';
                    output += '<tr> <td><em>Department</em></td> <td>' + students[i].Department + '</td> </tr>';
                    output += '<tr> <td> <em>Level</em></td> <td>' + students[i].Level + '</td> </tr>';
                    output += '<tr> <td> <em>Date of Birth</em></td><td>' + formatDate(students[i].DateOfBirth) + '</td></tr>';
                    output += '<tr> <td> <em>Mobile Number</em></td> <td>' + students[i].PhoneNo + '</td> </tr>';
                    output += '<tr> <td> <em>Email Address</em></td><td> ' + students[i].Email + '</td></tr>';
                    output += '<tr> <td> <em>Date Registered</em></td><td>' + formatDate(students[i].DateReg) + '</td></tr>';
                    output += '</tbody> </table> <br/></td> </tr>';
                }
                output += '</tbody></table>';
                
                $('#spanAllStudents').html(output);
            }
            else {
                message('allStudentNo', students.length, 'brown');
                message('spanAllStudents', 'There are no students to show');
                $('#spanAllStudents').addClass('info');
            }
        }
    })
    return false
}

//function for one student link click
function oneStudentLink() {
    clearValues()
    hideAll();
    makeVisible("#oneStudent");
    makeInvisible("#oneResult");
    
    var studentInfo = getStudentsInfo();
    var studentHtmllist = generateSelectList('allStudentListOne', studentInfo.Name, studentInfo.Id);
    $('#allStudentsOne').html(studentHtmllist);
    $('#allStudentListOne').val('0');                                                   //set selected index to the first item with value '0'
}

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
}

//function for edit student link click
function editStudentLink() {
    clearValues()
    hideAll();
    makeVisible("#editStudent");
    makeInvisible("#editForm");
    makeInvisible("#editResult");
}

//function for delete student link click
function deleteStudentLink() {
    clearValues()
    hideAll();
    makeVisible("#deleteStudent");
    makeInvisible('#delResult');
}

//function for about link click
function aboutLink() {
    clearValues()
    hideAll();
    makeVisible("#about");
}

//////////////////////////////


//HELPER FUNCTIONS

//function to clear all neccesary values
function clearValues() {
    message('#msgOne', '');
    message('#msgAdd', '');
    message('#msgEdit', '');
    message('#msgDel', '');
}

//function to show a tag/control
function makeVisible(controlId) {
    $(controlId).css("display", "block");
    $(controlId).css("visibility", "visible");
}

//function to hide a tag/control
function makeInvisible(controlId) {
    $(controlId).css("display", "none");
    $(controlId).css("visibility", "hidden");
}

//function to display page messages
function message(control, msg, color) {
    $(control).text(msg);
    $(control).css("color", color);
}

//get all students basic info
function getStudentsInfo() {
    //initial values
    var students = {
        Name: ['Select Using Student Name'],
        Id: ['0']
    };
    $.ajax({
        type: "GET",
        url: "/Students",
        async: false,
        success: function (studnts) {
            
            //loop through array of all students and generate an array of their name and _id for a select list
            for (var i = 0; i < studnts.length; i++) {
                students.Name.push(studnts[i].LastName + ", " + studnts[i].FirstName + " " + studnts[i].MiddleName);
                students.Id.push(studnts[i]._id);
            }
        }
    });
    
    return students;
};

//function to validate matric number
function validSearchText(query) {
    var status;
    var queryRegex = new RegExp("^[a-zA-Z]{3}[0-9]{4}$");                   //regular expression to check if it in the form of a matric no
    status = queryRegex.test(query) || query.length == 24;                  //check if it is a matric no or an _id
    return status;
}

//function to format a mongo db date to a formatted string
function formatDate(stringDate) {
    var newDate = new Date(stringDate);
    return newDate.toDateString();
}

//function to get date and convert to array integer values
function getDateInt(stringdate2) {
    var newDate = new Date(stringdate2);
    var dateArray = [];
    dateArray.push(newDate.getDate());                                  //day
    dateArray.push(newDate.getMonth() + 1);                             //month
    dateArray.push(newDate.getFullYear());                              //year
    return dateArray;
}

//get all faculties
function getFac() {
    var faculties;
    $.ajax({
        type: "GET",
        url: "dbTables/faculties",
        async: false,
        success: function (fac) {
            faculties = fac;                                    //an array of all faculties
        }
    });
    return toPropertyArray(faculties, 'Faculty');               //formatted array with string contained in the property, 'Faculty'
};

//generate a select list with all faculties
function populateSelectFac(facSpanId, facListId) {
    var faculties = getFac();
    var facSelectList = generateSelectList(facListId, faculties);           //generate the select list
    $(facSpanId).html(facSelectList);                                       //append as html
};

//get departments by faculty
function getDept(fac) {
    var depts = { Departments: [] , Years: [] };
    
    $.ajax({
        type: "GET",
        url: "dbTables/departments",
        async: false,
        success: function (allDepts) {
            
            //get department for selected faculty
            for (var i = 0; i < allDepts.length; i++) {
                
                if (allDepts[i].Faculty == fac) {
                    
                    //copy department and year values into an array containing both values 2 indices
                    for (var j = 0; j < allDepts[i].Depts.length; j++) {
                        depts.Departments.push(allDepts[i].Depts[j].Department);
                        depts.Years.push(allDepts[i].Depts[j].Years);
                    }
                    break;
                }
            }
        }
    });

    return depts;
}

//generate a select list with all departments
function populateSelectDept(fac, deptSpanId, deptListId) {
    var depts = getDept(fac);
    var deptSelectList = generateSelectList(deptListId, depts.Departments, depts.Years);
    $(deptSpanId).html(deptSelectList);
};

//generate a select list with all Levels
function populateSelectLevel(years, levSpanId, listId) {
    var levels = [];
    
    //get array of levels using years for selected department
    for (var i = 1; i <= years; i++) {
        levels.push(i * 100);
    }
    
    var levelSelectList = generateSelectList(listId, levels);
    $(levSpanId).html(levelSelectList);
};

//convert array of table objects to an array of strings using selected property
function toPropertyArray(objArray, property) {
    var stringArray = [];
    for (var i = 0; i < objArray.length; i++) {
        stringArray.push(objArray[i][property]);
    }
    return stringArray;
};

//generate a select list using array, for its text and values for its values and giving it an id
function generateSelectList(id, texts, values) {
    
    if (values == null) {
        values = texts;
    }
    
    var selectList = "<select id='" + id + "' class='dropdown addDropdown dropdown-header textDark'>";
    for (var i = 0; i < texts.length; i++) {
        selectList += "<option value='" + values[i] + "'>" + texts[i] + "</option>";
    }
    selectList += "</select>";
    
    return selectList;
}

/////////////////////////////////////////////////////