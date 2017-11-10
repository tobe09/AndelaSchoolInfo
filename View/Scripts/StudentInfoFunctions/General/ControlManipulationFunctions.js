//to populate select list with expected birth years of students
function getAcceptedYears(plainYearListId, spanId) {
    var years = [];
    
    var ageRange = getAgeRange();                                               //get the acceptable age range from the server
    
    var highestYear = new Date().getFullYear() - ageRange.minAge;
    var lowestYear = new Date().getFullYear() - ageRange.maxAge;
    
    //generate array of accepted birth years
    for (var i = highestYear; i >= lowestYear ; i--) {
        years.push(i);
    }
    
    var yearsList = generateSelectList(plainYearListId, years);
    $(spanId).html(yearsList);
}


//to populate select list with maximum days in a month
function getDays(plainListId, spanId, monthVal, yearVal) {
    var days = [];
    
    var endDay;
    if (monthVal == null || yearVal == null) {
        endDay = 31;
    }
    else {
        endDay = maxDays(monthVal, yearVal);                        //to get the maximum number of days for selected month (and year for february)
    }
    
    //generate an array containing days from 1 to the last day
    for (var i = 1; i <= endDay; i++) {
        days.push(i);
    }
    
    var daysList = generateSelectList(plainListId, days)
    $(spanId).html(daysList);
}


//repopulate day of birth select list
function repopulateDob(daySpanId, plainDayListId, monthListId, yearListId) {
    
    //get the previously selected day
    var previousDay = $('#' + plainDayListId).val();                             //reset the selected day
    
    var year = $(yearListId).val();
    var month = $(monthListId).val();
    getDays(plainDayListId, daySpanId, month, year);                            //repopulate day of birth select list accordingly
    
    $('#' + plainDayListId).val(previousDay);                                   //reset the selected day
}


//to populate select list with months of the year
function getMonths(plainMonthListId, spanId) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var monthsList = generateSelectList(plainMonthListId, months, monthValues);
    $(spanId).html(monthsList);
}


//generate a select list with all faculties
function populateSelectFac(facSpanId, plainFacListId, allFaculties) {
    var faculties = allFaculties;
    faculties = toPropertyArray(faculties, 'Faculty');                      //returns formatted array with strings contained in the property, 'Faculty'
    var facSelectList = generateSelectList(plainFacListId, faculties);      //generate the select list
    $(facSpanId).html(facSelectList);                                       //append as html
};


//generate a select list with all departments
function populateSelectDept(fac, deptSpanId, plainDeptListId, allDepartments) {
    var depts = allDepartments;
    depts = toDeptArray(depts, fac);
    var deptSelectList = generateSelectList(plainDeptListId, depts.Departments, depts.Years);
    $(deptSpanId).html(deptSelectList);
};


//generate a select list with all Levels
function populateSelectLevel(years, levSpanId, plainListId) {
    var levels = [];
    
    //get array of levels using years for selected department
    for (var i = 1; i <= years; i++) {
        levels.push(i * 100);
    }
    
    var levelSelectList = generateSelectList(plainListId, levels);
    $(levSpanId).html(levelSelectList);
};