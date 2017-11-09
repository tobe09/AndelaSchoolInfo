//function to call the appropriate callback method following an ajax call according to method's name
function callBackDispatcher(callBackMethodName, result) {
    
    //call appropriate callback methods
    switch (callBackMethodName) {

        case 'allStudentsInfoCallBack': allStudentsInfoCallBack(result);
            break;

        case 'getStudentsListOneCallBack': getStudentsListOneCallBack(result);
            break;

        case 'oneStudentInfoCallBack': oneStudentInfoCallBack(result);
            break;

        case 'addStudentCallBack': addStudentCallBack(result);
            break;

        case 'editStudentShowCallBack': editStudentShowCallBack(result);
            break;

        case 'editStudentResultCallBack': editStudentResultCallBack(result);
            break;

        case 'deleteStudentShowCallBack': deleteStudentShowCallBack(result);
            break;

        case 'deleteStudentResultCallBack': deleteStudentResultCallBack(result);
            break;

        default: pageLoad();
            break;
    }
}