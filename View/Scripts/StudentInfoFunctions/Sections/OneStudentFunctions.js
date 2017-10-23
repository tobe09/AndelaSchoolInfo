$(function () {
    //GET ONE STUDENT SECTION

    //executes when one student link is clicked
    $("#oneLink").on("click", oneStudentLinkClick)
    $("#oneLinkFooter").on("click", oneStudentLinkClick)
    
    //executes when the selected student from select list is changed
    $(document.body).on('change', "#allStudentListOne", function (e) {
        e.preventDefault();                                             
        var query = $("#allStudentListOne").val();                      //get student identifier from student select list
        
        $('#txtIdOne').val('');                                         //reset text input  
        if (query != '0') {                                             //ensure that a student is chosen using the select list value
            getOneStudent(query, 'oneStudentInfoCallBack');             //ajax call to get selected student information
        }
        else {
            makeInvisible('#oneResult');                                //hide result div
            message("#msgOne", '');                                     //clear message
        }         
    })
    
    //executes when the button to display single student is clicked
    $("#btnStudentOne").on("click", function () {
        var query = $("#txtIdOne").val();                               //get sudent identifier from input textbox
        
        $('#allStudentListOne').val('0');                               //reset select list
        if (validSearchText(query)) {                                   //check validity of entry
            getOneStudent(query, 'oneStudentInfoCallBack');             //ajax call to get selected student using text value entered
        }
        else {
            makeInvisible('#oneResult');                                //hide result div
            message("#msgOne", "Please enter a valid matriculation number", 'red');
        }
    })

    /////////////////////////////////////////
})


//function for one student link click
function oneStudentLinkClick() {
    clearValues()
    hideAll();
    makeVisible("#oneStudent");
    makeInvisible("#oneResult");
    
    getAllStudents('getStudentsListOneCallBack');                   //ajax call to get all student for select list
}


//get all students basic info and populate select list
function getStudentsListOneCallBack(studnts) {
    
    //student successfully generated
    if (studnts!=null && typeof (studnts.Error) == 'undefined') {
        //initial values
        var students = {
            Name: ["Select Student by Name"],
            Id: ['0']
        };
        
        //loop through array of all students and generate an array of students' name and _id for a select list
        for (var i = 0; i < studnts.length; i++) {
            students.Name.push(studnts[i].LastName + ", " + studnts[i].FirstName + " " + studnts[i].MiddleName);
            students.Id.push(studnts[i]._id);
        }
        
        var studentHtmllist = generateSelectList('allStudentListOne', students.Name, students.Id);          //generate select list of all students
        $('#allStudentsOne').html(studentHtmllist);
        $('#allStudentListOne').val('0');                                                             //set selected index to the first item with value '0'
    }                                                                 

    //exceptional situation
    else {
        if (studnts == null) {
            message("#msgOne", ajaxErrMsg, 'red');
        }
        else {
            message("#msgOne", studnts.Error, 'red');
        }
    }
};


//function to display the information of selected student
function oneStudentInfoCallBack(student) {
    
    if (student!=null && typeof (student.Error) == "undefined") {
        makeVisible('#oneResult');                                  //show result
        
        //populate table with information
        $('#guidOne').text(student._id);
        $('#matNoOne').text(student.MatricNo);
        $('#lNameOne').text(student.LastName);
        $('#othName').html(student.FirstName + "&nbsp;" + student.MiddleName);
        $('#facOne').text(student.Faculty);
        $('#deptOne').text(student.Department);
        $('#levelOne').text(student.Level);
        var dob = formatDate(student.DateOfBirth);                  //format date of birth as a descriptive string
        $('#dobOne').text(dob);
        $('#phoneNoOne').text(student.PhoneNo);
        $('#emailOne').text(student.Email);
        dob = formatDate(student.DateReg);
        $('#dRegOne').text(dob);
        
        message("#msgOne", 'Selected student information successfully generated', 'green');
    }
    
    //exceptional situation
    else {
        makeInvisible('#oneResult');
        if (student == null) {
            message("#msgOne", ajaxErrMsg, 'red');
        }
        else {
            message("#msgOne", student.Error, 'red');
        }
    }
}