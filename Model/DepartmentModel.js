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
var departmentEntry = Entry.dbEntry     //function to display message for db storage entry
var localEntry = Entry.localEntry;       //function to display message for local collection storage entry


var newDepartment = {
    Faculty: 'Agriculture and Forestry',
    Depts: [{ Department: 'Agricultural Economics', Years: 4 , Prefix: 'AEN' },
        { Department: 'Agricultural Extension and Rural Development', Years: 4, Prefix: 'AER' },
        { Department: 'Agronomy', Years: 4, Prefix: 'AGR' },
        { Department: 'Animal Science', Years: 4, Prefix: 'ANS' },
        { Department: 'Crop Protection and Environmental Biology', Years: 4, Prefix: 'CPP' },
        { Department: 'Forest Resource Management', Years: 4, Prefix: 'FRM' },
        { Department: 'Wildlife and Fisheries Management', Years: 4, Prefix: 'WFM' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Arts',
    Depts: [{ Department: 'African Languages', Years: 4, Prefix: 'AFL' }, 
        { Department: 'Arabic and Islamic Studies', Years: 4, Prefix: 'AIS' }, 
        { Department: 'Classics', Years: 4, Prefix: 'CLS' }, 
        { Department: 'Communication and Language Arts', Years: 4, Prefix: 'CLA' }, 
        { Department: 'English', Years: 4, Prefix: 'ENG' }, 
        { Department: 'European Studies', Years: 4, Prefix: 'EUR' }, 
        { Department: 'History', Years: 4, Prefix: 'HST' }, 
        { Department: 'Linguistics', Years: 4, Prefix: 'LIN' }, 
        { Department: 'Philosophy', Years: 4, Prefix: 'PHL' }, 
        { Department: 'Religious Studies', Years: 4, Prefix: 'REL' }, 
        { Department: 'Theatre Arts', Years: 4, Prefix: 'THR' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Basic Medical Sciences',
    Depts: [{ Department: 'Anatomy', Years: 5, Prefix: 'ANA' },
        { Department: 'Biochemistry', Years: 5, Prefix: 'BCM' }, 
        { Department: 'Chemical Pathology', Years: 5, Prefix: 'CPT' }, 
        { Department: 'Heamatology', Years: 5, Prefix: 'HAE' }, 
        { Department: 'Medical Microbiology and Parasitology', Years: 5, Prefix: 'MMP' }, 
        { Department: 'Pathology', Years: 5, Prefix: 'PAT' }, 
        { Department: 'Pharmacology and Therapeutics', Years: 5, Prefix: 'PTH' }, 
        { Department: 'Physiology', Years: 5, Prefix: 'PHS' }, 
        { Department: 'Virology', Years: 5, Prefix: 'VIR' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Clinical Sciences',
    Depts: [{ Department: 'Anaesthesia', Years: 5, Prefix: 'ANS' },
        { Department: 'Child Health', Years: 5, Prefix: 'CHH' },   
        { Department: 'Medicine', Years: 6, Prefix: 'MED' },  
        { Department: 'Nursing', Years: 5, Prefix: 'NUR' },  
        { Department: 'Obstetrics and Gynaecology', Years: 5, Prefix: 'OBS' },  
        { Department: 'Ophtalmology', Years: 5, Prefix: 'OPH' },  
        { Department: 'Oto-Rhino-Laryncology', Years: 5, Prefix: 'ORL' },  
        { Department: 'Paediatrics', Years: 5, Prefix: 'PDT' },  
        { Department: 'Physiotherapy', Years: 5, Prefix: 'PST' },  
        { Department: 'Preventive Medicine Primary Care', Years: 5, Prefix: 'PMP' },
        { Department: 'Psychiatry', Years: 5, Prefix: 'PSC' },  
        { Department: 'Radiology', Years: 5, Prefix: 'RAD' },  
        { Department: 'Radiotherapy', Years: 5, Prefix: 'RDT' },   
        { Department: 'Surgery', Years: 6, Prefix: 'SUR' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Dentistry',
    Depts: [{ Department: 'Child Oral Health', Years: 5, Prefix: 'COH' },
        { Department: 'Oral and Maxillofacial Surgery', Years: 5 , Prefix: 'OMS' },  
        { Department: 'Oral Pathology', Years: 5, Prefix: 'OPT' },   
        { Department: 'Periodontal and Community Dentistry', Years: 5, Prefix: 'PCD' },   
        { Department: 'Restorative Dentistry', Years: 5, Prefix: 'RSD' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Education',
    Depts: [{ Department: 'Adult Education', Years: 4, Prefix: 'ADE' }, 
        { Department: 'Education', Years: 4, Prefix: 'EDU' },
        { Department: 'Educational Management', Years: 4, Prefix: 'EDM' },
        { Department: 'Guidance and Counselling', Years: 4, Prefix: 'GNC' },
        { Department: 'Human Kinetics and Health Education', Years: 4, Prefix: 'HKE' },
        { Department: 'Special Education', Years: 4, Prefix: 'SPE' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Law',
    Depts: [{ Department: 'Private and Business Law', Years: 4, Prefix: 'PBL' },
        { Department: 'Public and International Law', Years: 4, Prefix: 'CHM' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Pharmacy',
    Depts: [{ Department: 'Clinical Pharmacy and Administration', Years: 5, Prefix: 'CPA' },
        { Department: 'Pharmaceutical Chemistry', Years: 5, Prefix: 'PHC' },
        { Department: 'Pharmaceutical Microbiology', Years: 5, Prefix: 'PMC' },
        { Department: 'Pharmacognosy', Years: 5, Prefix: 'PHG' },
        { Department: 'Pharmacy and Industrial Pharmacy', Years: 5, Prefix: 'PIP' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Public Health',
    Depts: [{ Department: 'Health Policy and Management', Years: 4, Prefix: 'HPM' }, 
        { Department: 'Health Promotion and Education', Years: 4, Prefix: 'HPE' },
        { Department: 'Human Nutrition and Diatetics', Years: 4, Prefix: 'HNT' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Science',
    Depts: [{ Department: 'Archaeology and Anthropology', Years: 5, Prefix: 'AAN' },
        { Department: 'Botany', Years: 5, Prefix: 'BTN' },
        { Department: 'Chemistry', Years: 5, Prefix: 'CHM' },
        { Department: 'Geology', Years: 5, Prefix: 'GEO' },
        { Department: 'Mathematics', Years: 5, Prefix: 'MAT' },
        { Department: 'Microbiology', Years: 5, Prefix: 'MCB' },
        { Department: 'Physics', Years: 5, Prefix: 'PHY' },
        { Department: 'Statistics', Years: 5, Prefix: 'STA' },
        { Department: 'Zoology', Years: 5, Prefix: 'ZOO' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Social Sciences',
    Depts: [{ Department: 'Economics', Years: 5, Prefix: 'ECN' }, 
        { Department: 'Geography', Years: 5, Prefix: 'GEO' }, 
        { Department: 'Political Science', Years: 4, Prefix: 'POL' },
        { Department: 'Psychology', Years: 4, Prefix: 'PSY' }, 
        { Department: 'Sociology', Years: 4, Prefix: 'SOC' },
        { Department: 'Urban and Regional Planning', Years: 4, Prefix: 'URP' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Technology',
    Depts: [{ Department: 'Agricultural and Environmental Engineering', Years: 5, Prefix: 'AGE' },
        { Department: 'Civil Engineering', Years: 5, Prefix: 'CVE' },
        { Department: 'Computer Engineering', Years: 5, Prefix: 'CSE' },
        { Department: 'Electrical/Electronics Engineering', Years: 5, Prefix: 'EEE' },
        { Department: 'Food Technology', Years: 5, Prefix: 'FTE' },
        { Department: 'Industrial and Production Engineering', Years: 5, Prefix: 'IPE' }, 
        { Department: 'Mechanical Engineering', Years: 5, Prefix: 'MSE' }, 
        { Department: 'Production Engineering', Years: 5, Prefix: 'PRE' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));

var newDepartment = {
    Faculty: 'Veterinary Medicine',
    Depts: [{ Department: 'Pathology', Years: 5, Prefix: 'PAH' },
        { Department: 'Veterinary Anatomy', Years: 5, Prefix: 'VEA' },
        { Department: 'Veterinary Medicine', Years: 5, Prefix: 'VEM' },
        { Department: 'Veterinary Microbilogy and Parasitology', Years: 5, Prefix: 'VEP' },
        { Department: 'Veterinary Physiology, biochemistry and Pharmacology', Years: 5, Prefix: 'VEB' },
        { Department: 'Veterinary Public Health and Preventive Medicine', Years: 5, Prefix: 'VEH' },
        { Department: 'Veterinary Surgery and Reproduction', Years: 5, Prefix: 'VES' }]
};
Departments.push(newDepartment);
localEntry(collectionName);
newDepartment = new departmentModel(newDepartment);
newDepartment.save(departmentEntry(collectionName, newDepartment));


//export all departments
module.exports.Departments = Departments;


   