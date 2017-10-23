//DELETE STUDENT INFORMATION SECTION

$(function () {
    /////////////////////////////////////////
    
    //executes when the link to delete is clicked
    $("#deleteLink").on("click", deleteStudentLinkClick);
    $("#deleteLinkFooter").on("click", deleteStudentLinkClick);
    
    //executes when the button to show student to be deleted is clicked
    $("#btnDelShow").on("click", function () {
        var query = $("#txtDelStudent").val();
        
        if (validSearchText(query)) {
            
            getOneStudent(query, 'deleteStudentShowCallBack');                                                      //get selected student
        }
        else {
            message('#msgDel', "Please enter a valid matriculation number", "red");
            makeInvisible('#delResult');
        }
    })
    
    //executes when the button to delete student is clicked
    $("#btnDelSubmit").on("click", function () {
        var query = $("#guidDel").text();
        
        //make ajax call to delete student with student id and call back function
        deleteStudent(query, 'deleteStudentResultCallBack');                                         

    })
    
    /////////////////////////////////////////
})


//function for delete student link click
function deleteStudentLinkClick() {
    clearValues();
    hideAll();
    makeVisible("#deleteStudent");
    makeInvisible('#delResult');
}

//call back function to display the result of ajax call on student to be deleted
function deleteStudentShowCallBack(result) {
    
    if (result != null && typeof (result.Error) == "undefined") {
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
        makeInvisible('#delResult');
        if (result == null) {
            message('#msgDel', ajaxErrMsg, "red");
        }
        else {
            message('#msgDel', result.Error, "red");
        }
    }
}

//callback function to notify user of deletion status
function deleteStudentResultCallBack(result) {
    
    //result is not used since the same values already exist
    $('#matNoTd').removeClass('warning').addClass('info');
    makeVisible('#headerResDel');
    makeInvisible('#headerInfoDel');
    makeInvisible('#btnDelSubmit');
    message('#msgDel', 'Student has been Deleted from the Database', 'green');
}