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
var facultyEntry = Entry.dbEntry
var localEntry = Entry.localEntry;


var newFaculty = { Faculty: 'Arts' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Languages' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Science' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));

var newFaculty = { Faculty: 'Technology' };
Faculties.push(newFaculty);
localEntry(collectionName);
newFaculty = new facultyModel(newFaculty);
newFaculty.save(facultyEntry(collectionName, newFaculty));


//export all faculties
module.exports.Faculties = Faculties;