$(function () {
    //GET ONE STUDENT SECTION

    //executes when one student link is clicked
    $("#oneLink").on("click", oneStudentLink)
    $("#oneLinkFooter").on("click", oneStudentLink)
    
    //executes when the selected faculty option (for add student page) is changed
    $(document.body).on('change', "#allStudentListOne", function (e) {
        e.preventDefault();                                             //get sudent identifier from student select list
        var query = $("#allStudentListOne").val();                      //get sudent identifier from student select list
        
        if (query != '0') {                                             //ensure that a student is chosen
            oneStudentInfo(query);
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
            oneStudentInfo(query);                                      //get student using text
        }
        else {
            message("#msgOne", "Please enter a valid matriculation number", 'red');
            makeInvisible('#oneResult');                                //hide result div
        }
        $('#allStudentListOne').val('0');                               //reset select list
    })
    
    //function to display the information of selected student
    function oneStudentInfo(query) {
        var student = getOneStudent(query);                             //get selected student
        
        if (typeof (student.Error) == "undefined") {
            makeVisible('#oneResult');                                  //show result
            
            //populate table with information
            $('#guidOne').text(student._id);
            $('#matNoOne').text(student.MatricNo);
            $('#lNameOne').text(student.LastName);
            $('#othName').html(student.FirstName + "&nbsp;" + student.MiddleName);
            $('#facOne').text(student.Faculty);
            $('#deptOne').text(student.Department);
            $('#levelOne').text(student.Level);
            var dob = formatDate(student.DateOfBirth);                  //format date of birth as string
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

    /////////////////////////////////////////
})

//HELPER FUNCTIONS FOR SECTION

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

//get all students basic info
function getStudentsInfo() {
    //initial values
    var students = {
        Name: ["Select Using Student's Name"],
        Id: ['0']
    };
    
    var studnts = getAllStudents();
    
    //loop through array of all students and generate an array of their name and _id for a select list
    for (var i = 0; i < studnts.length; i++) {
        students.Name.push(studnts[i].LastName + ", " + studnts[i].FirstName + " " + studnts[i].MiddleName);
        students.Id.push(studnts[i]._id);
    }
    
    return students;
};