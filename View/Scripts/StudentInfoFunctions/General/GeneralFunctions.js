//client side error message
var errMsg = 'User Input error has occured';


//called to display only home page when page is initially loaded
window.onload = pageLoad();


//displays only the home page
function pageLoad() {
    clearValues()
    hideAll();
    makeVisible('#home')
}


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


//function to validate matric number (or check if input is a unique id type)
function validSearchText(query) {
    var status;

    var queryRegex = new RegExp("^[a-zA-Z]{3}[0-9]{4}$");                   //regular expression to check if it in the form of a matric no
    status = queryRegex.test(query) || query.length == 24;                  //check if it is a matric no or an _id

    return status;
}


//function to convert a mongo db date to a formatted string
function formatDate(stringDate) {
    var formattedDate;
    
    var newDate = new Date(stringDate);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    formattedDate = days[newDate.getDay()];                                    //name of day of the week
    var suffix = dateSuffix(newDate.getDate());
    formattedDate += ', ' + newDate.getDate() + suffix;                            //day of the month
    formattedDate += ' ' + months[newDate.getMonth()];                             //name of month of the year
    formattedDate += ', ' + newDate.getFullYear();                                 //numerical year
    
    return formattedDate;
}


//helper function to get the suffix for a date
function dateSuffix(date) {
    var suffix;
    
    if (date % 10 == 1 && date != 11) { suffix = 'st'; }
    else if (date % 10 == 2 && date != 12) { suffix = 'nd'; }
    else if (date % 10 == 3 && date != 13) { suffix = 'rd'; }
    else { suffix = 'th'; }
    
    return suffix;
}


//function to get date and convert to array integer values
function getDateArray(stringdate) {
    var dateArray = [];

    var newDate = new Date(stringdate);
    dateArray.push(newDate.getDate());                                  //day
    dateArray.push(newDate.getMonth() + 1);                             //month
    dateArray.push(newDate.getFullYear());                              //year

    return dateArray;
}


//helper function to repopulate day on month change (gregorian calender)
function maxDays(monthVal, yearVal) {
    var maxDay;
    
    //check february and leap years
    if (monthVal == 2 && (yearVal % 4 != 0 || (yearVal % 100 == 0 && yearVal % 400 != 0))) {
        maxDay = 28;
    }
    else if (monthVal == 2 && (yearVal % 4 == 0 && (yearVal % 100 != 0 || yearVal % 400 == 0))) {
        maxDay = 29;
    }
    else if (monthVal == 4 || monthVal == 6 || monthVal == 9 || monthVal == 11) {
        maxDay = 30;
    }
    else {
        maxDay = 31;
    }
    
    return maxDay;
}


//convert array of table objects to an array of strings using selected property
function toPropertyArray(objArray, property) {
    var stringArray = [];

    for (var i = 0; i < objArray.length; i++) {
        stringArray.push(objArray[i][property]);
    }

    return stringArray;
};


//get departments by faculty (from which levels will be gotten)
function toDeptArray(allDepts, fac) {
    var depts = { Departments: [] , Years: [] };
    
    //get department for selected faculty
    for (var i = 0; i < allDepts.length; i++) {
        
        if (allDepts[i].Faculty == fac) {
            
            //copy department and year values into an array containing both values in two indices
            for (var j = 0; j < allDepts[i].Depts.length; j++) {
                depts.Departments.push(allDepts[i].Depts[j].Department);
                depts.Years.push(allDepts[i].Depts[j].Years);
            }
            
            break;
        }
    }
    
    return depts;                                               //return all departments
}


//generate a select list using array, for its text and values for its values and giving it an id
function generateSelectList(id, texts, values) {
    var selectList;
    
    if (values == null) {
        values = texts;
    }
    
    selectList = "<select id='" + id + "' class='dropdown addDropdown dropdown-header textDark'>";
    for (var i = 0; i < texts.length; i++) {
        selectList += "<option value='" + values[i] + "'>" + texts[i] + "</option>";
    }
    selectList += "</select>";
    
    return selectList;
}