//repopulate day of birth select list
function repopulateDob(daySpanId, dayListId, monthListId, yearListId) {

    //get the previously selected day
    var previousDay = $('#' + dayListId).val();                             //reset the selected day
    
    var year = $(yearListId).val();
    var month = $(monthListId).val();
    getDays(dayListId, daySpanId, month, year);                            //repopulate day of birth select list accordingly
    
    $('#' + dayListId).val(previousDay);                                   //reset the selected day
}


//to populate select list with expected birth years of students
function acceptedYears(listId, spanId, ageRange) {
    var years = [];
    
    var highestYear = new Date().getFullYear() - ageRange.minAge;
    var lowestYear = new Date().getFullYear() - ageRange.maxAge;
    
    for (var i = highestYear; i >= lowestYear ; i--) {
        years.push(i);
    }
    
    var yearsList = generateSelectList(listId, years);
    $(spanId).html(yearsList);
}


//to populate select list with maximum days in a month
function getDays(listId, spanId, monthVal, yearVal) {
    var days = [];
    
    var endDay;
    if (monthVal == null || yearVal == null) {
        endDay = 31;
    }
    else {
        endDay = maxDays(monthVal, yearVal);
    }
    
    //generate an array containing days from 1 - 31
    for (var i = 1; i <= endDay; i++) {
        days.push(i);
    }
    
    var daysList = generateSelectList(listId, days)
    $(spanId).html(daysList);
}


//to populate select list with months of the year
function getMonths(listId, spanId) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var monthsList = generateSelectList(listId, months, monthValue);
    $(spanId).html(monthsList);
}


//generate a select list with all faculties
function populateSelectFac(facSpanId, facListId) {
    var faculties = getFac();
    faculties = toPropertyArray(faculties, 'Faculty');                      //formatted array with string contained in the property, 'Faculty'
    var facSelectList = generateSelectList(facListId, faculties);           //generate the select list
    $(facSpanId).html(facSelectList);                                       //append as html
};


//generate a select list with all departments
function populateSelectDept(fac, deptSpanId, deptListId) {
    var depts = getDept();
    depts = toDeptArray(depts, fac);
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