var mongoose = require('mongoose');

// create instance of faculty schema
var facultyDbSchema = mongoose.Schema;

//create schema
const facultySchema=new facultyDbSchema({
    Faculty: { type: String, required: true, unique: true }
});

//generate model
var collectionName = 'faculties';
var facultyModel = mongoose.model(collectionName, facultySchema);


//create local collection of all faculties for easy access
var Faculties = [];


//CREATE OR UPDATE (UPSERT) CONTENT IN DATABASE AND LOCAL COLLECTION
var Entry = require('./Scripts/showDbEntry.js');
var facultyEntry = Entry.dbEntry                //function to display message for db storage entry
var localEntry = Entry.localEntry;              //function to display message for local collection storage entry


var newFaculty = { Faculty: 'Agriculture and Forestry' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Arts' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Basic Medical Sciences' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Clinical Sciences' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Dentistry' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Education' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Law' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Pharmacy' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Public Health' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Science' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Social Sciences' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Technology' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Veterinary Medicine' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));


//export all faculties
module.exports.Faculties = Faculties;