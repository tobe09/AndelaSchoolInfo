//DELETE STUDENT INFORMATION SECTION

$(function () {
    /////////////////////////////////////////
    
    //executes when the link to delete is clicked
    $("#deleteLink").on("click", deleteStudentLink);
    $("#deleteLinkFooter").on("click", deleteStudentLink);
    
    //executes when the button to show student to be deleted is clicked
    $("#btnDelShow").on("click", function () {
        var query = $("#txtDelStudent").val();
        
        if (validSearchText(query)) {
            
            var result = getOneStudent(query);                                                      //get selected student
            
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
        else {
            message('#msgDel', "Please enter a valid matriculation number", "red");
            makeInvisible('#delResult');
        }
    })
    
    //executes when the button to show student to be deleted is clicked
    $("#btnDelSubmit").on("click", function () {
        var query = $("#guidDel").text();
        
        var result = deleteStudent(query);                                          //get deleted student information (not used)

        $('#matNoTd').removeClass('warning').addClass('info');
        makeVisible('#headerResDel');
        makeInvisible('#headerInfoDel');
        makeInvisible('#btnDelSubmit');
        message('#msgDel', 'Student has been Deleted from the Database', 'green');
    })
    
    /////////////////////////////////////////
})


//HELPER FUNCTIONS FOR SECTION

//function for delete student link click
function deleteStudentLink() {
    clearValues()
    hideAll();
    makeVisible("#deleteStudent");
    makeInvisible('#delResult');
}