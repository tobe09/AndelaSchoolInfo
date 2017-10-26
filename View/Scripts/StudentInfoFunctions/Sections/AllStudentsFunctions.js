 //ALL STUDENTS SECTION

$(function () {
    ///////////////////////////////////////// 
    
    //executes when all students link is clicked
    $("#allLink").on("click", allStudentsLinkClick)
    $("#allLinkFooter").on("click", allStudentsLinkClick)
    
    ///////////////////////////////////////// 
})


//function for all students link click
function allStudentsLinkClick() {
    clearValues()
    hideAll();
    makeVisible("#allStudents");
    
    getAllStudents('allStudentsInfoCallBack');                          //get all students through an ajax call
    
}


//call back function to genarate and draw table of all students
function allStudentsInfoCallBack(students) {

    //successful generation of students
    if (students != null && typeof(students.Error)=='undefined') {
        
        message('#allStudentNo', students.length, 'brown');

        //students exist in the database
        if (students.length > 0) {
            message('#spanAllStudents', '', 'black');                   //reset to default text color
            
            var output = '<table id="allTable" class="table table-striped table-responsive text-center">';
            output += '<thead> <tr> <th class="text-center">S/N</th> <th class="text-center largeFont">Students\' Information</th> </tr> </thead> <tbody>';
            
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
        //no student in the database
        else {
            message('#spanAllStudents', 'No Registered Student Available', 'brown');
            $('#spanAllStudents').addClass('fontMsg');                                 
        }
    }

    //exceptional situation from ajax call or from server
    else {
        $('#spanAllStudents').addClass('fontMsg');
        if (students == null) {
            message('#spanAllStudents', ajaxErrMsg, 'red');
        }
        else {
            message('#spanAllStudents', students.Error, 'red');
        }                           
    }
}