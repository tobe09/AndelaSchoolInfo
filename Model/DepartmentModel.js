var mongoose = require('mongoose');

// create instance of department schema
var departmentDbSchema = mongoose.Schema;

//create schema
const deptSchema=new departmentDbSchema({
    Faculty: { type: String, required: true , unique: true },
    Departments: [{
            Department: { type: String, required: true, unique: true },
            Years: { type: String, required: true }
        }]
});

//generate model
var collectionName = 'departments';
var departmentModel = mongoose.model(collectionName, deptSchema);


var Departments = [];


//CREATE OR UPDATE (UPSERT) CONTENT IN DATABASE AND LOCAL COLLECTION
var Entry = require('./Scripts/showDbEntry.js');
var departmentEntry = Entry.dbEntry
var localEntry = Entry.localEntry;


var newDepartment = {
    Faculty: 'Arts',
    Depts: [{ Department: 'Drama', Years: 4 }, 
        { Department: 'Music', Years: 4 }, 
        { Department: 'Food and Nutrition', Years: 4 }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Languages',
    Depts: [{ Department: 'English', Years: 4 }, 
        { Department: 'French', Years: 4 }, 
        { Department: 'German', Years: 4 },
        { Department: 'Spanish', Years: 4 }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Science',
    Depts: [{ Department: 'Medicine', Years: 6 },
        { Department: 'Botany', Years: 5 }, 
        { Department: 'Zoology', Years: 5 }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Technology',
    Depts: [{ Department: 'Computer Engineering', Years: 5 },
        { Department: 'Electrical Engineering', Years: 5 }, 
        { Department: 'Mechanical Engineering', Years: 5 }, 
        { Department: 'Civil Engineering', Years: 5 }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));


//export all departments
module.exports.Departments = Departments;


   