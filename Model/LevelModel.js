var mongoose = require('mongoose');

// create instance of level schema
var levelDbSchema = mongoose.Schema;

//create schema
const levelSchema=new levelDbSchema({
    Level: { type: Number, required: true, unique: true }
});

//generate model
var collectionName = 'levels';
var levelModel = mongoose.model(collectionName, levelSchema);


//create local collection of all levels for easy access
var Levels = [];


//CREATE OR UPDATE (UPSERT) CONTENT IN DATABASE AND LOCAL COLLECTION
var Entry = require('./Scripts/showDbEntry.js');
var levelEntry = Entry.dbEntry;                       //function to display message for db storage entry
var localEntry = Entry.localEntry;                   //function to display message for local collection storage entry

var newLevel = { Level: 100 };
Levels.push(newLevel);
localEntry(collectionName);
newLevel = new levelModel(newLevel);
newLevel.save(levelEntry(collectionName, newLevel));

newLevel = { Level: 200 };
Levels.push(newLevel);
localEntry(collectionName);
newLevel = new levelModel(newLevel);
newLevel.save(levelEntry(collectionName, newLevel));

newLevel = { Level: 300 };
Levels.push(newLevel);
localEntry(collectionName);
newLevel = new levelModel(newLevel);
newLevel.save(levelEntry(collectionName, newLevel));

newLevel = { Level: 400 };
Levels.push(newLevel);
localEntry(collectionName);
newLevel = new levelModel(newLevel);
newLevel.save(levelEntry(collectionName, newLevel));

newLevel = { Level: 500 };
Levels.push(newLevel);
localEntry(collectionName);
newLevel = new levelModel(newLevel);
newLevel.save(levelEntry(collectionName, newLevel));

newLevel = { Level: 600 };
Levels.push(newLevel);
localEntry(collectionName);
newLevel = new levelModel(newLevel);
newLevel.save(levelEntry(collectionName, newLevel));


//export all levels
module.exports.Levels = Levels;