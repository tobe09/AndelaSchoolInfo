exports.dbEntry = function dbEntry(collectionName, value) {
    try {
        console.log(collectionName + ' DB entry: ' + value + '\n');
    }
    catch (err) {
        console.log("Error: " + err.message);
    }
};

exports.localEntry = function localEntry(collectionName) {
    console.log('Data saved in ' + collectionName + ' collection');
}