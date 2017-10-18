﻿var mongoose = require('mongoose');

//used to perform validation on unique indices
var uniqueValidator = require('mongoose-unique-validator');

// create instance of student schema
var studentDbSchema = mongoose.Schema;

//create schema
const studentSchema=new studentDbSchema({
    LastName: { type: String, required: true, index: true, trim: true },
    FirstName: { type: String, required: true, index: true, trim: true },
    MiddleName: { type: String, default: '', trim: true },
    MatricNo: { type: String, required: true, unique: true },
    Faculty : { type: String, required: true },
    Department : { type: String, required: true },
    Level: { type: Number, required: true },
    DateOfBirth: { type: Date, required: true },
    PhoneNo: { type: String, trim: true },
    Email: { type: String, required: true, unique: true, trim: true },
    DateReg: { type: Date, default: Date.now }
})
.plugin(uniqueValidator);

//generate model
var collectionName = 'students';
var studentModel = mongoose.model(collectionName, studentSchema);



//CREATE OR UPDATE (UPSERT) CONTENT IN DATABASE

//get function to display data entry
var Entry = require('./Scripts/showDbEntry.js');
var studentEntry = Entry.dbEntry


var newStudent = new studentModel({
    LastName: 'Chineke',
    FirstName: 'Tobenna',
    MiddleName: 'Chinonso',
    MatricNo: 'COM5001',
    Faculty: 'Technology',
    Department: 'Computer Engineering',
    Level: '500',
    DateOfBirth: new Date(1993, 9 - 1, 6),
    PhoneNo: '+2348136831102',
    Email: 'chineketobenna@gmail.com',
    DateReg: Date.now()
});
newStudent.save(studentEntry('\n' + collectionName, newStudent));

newStudent = new studentModel({
    LastName: 'Adeniran',
    FirstName: 'Olumuyiwa',
    MiddleName: '',
    MatricNo: 'DRA4001',
    Faculty: 'Arts',
    Department: 'Drama',
    Level: '400',
    DateOfBirth: new Date(1996, 1 - 1, 19),
    PhoneNo: '08044444444',
    Email: 'mail2@gmail.com',
    DateReg: Date.now()
});
newStudent.save(studentEntry(collectionName, newStudent));

newStudent = new studentModel({
    LastName: 'Saka',
    FirstName: 'Azeez',
    MiddleName: 'Shehu',
    MatricNo: 'ENG1001',
    Faculty: 'Languages',
    Department: 'English',
    Level: '100',
    DateOfBirth: new Date(1998, 6 - 1, 24),
    PhoneNo: '09011111111',
    Email: 'mail2@gmail.com',
    DateReg: Date.now()
});
newStudent.save(studentEntry(collectionName, newStudent));



//export student model
module.exports.studentModel = studentModel;