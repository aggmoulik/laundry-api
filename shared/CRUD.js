let Response = require('../shared/Response');
let fs = require('fs');

// Return model by type
function getModelByType(type) {
    return require(type);
}

// Return new model instance by type
function createNewModelInstanceByName(type, val) {
    return new require(type)(val);
}

// Get All
exports.getAll = async (req, type, res) => {
    const model = getModelByType(type);
    console.log(model);
    let result = {};
    try {
        result = await model.find();
        console.log(result);
    } catch (error) {
        Response.error(res, 501, error.message);
    }
    Response.success(res, 200, "Success", result);
}

// Create
exports.create = function (val, type, res) {
    console.log("Body", val);
    const model = createNewModelInstanceByName(type, val);
    model.save((err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    });
}

// Update by ID
exports.updateById = function (id, val, type, res) {
    const model = getModelByType(type);
    model.findByIdAndUpdate(id, val, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res, undefined, "Updated");
    });
}

// Delete by ID
exports.deleteById = function (id, type, res) {
    const model = getModelByType(type);
    model.findByIdAndDelete(id, (err, doc) => {
        Response.generalResponse(err, res, undefined, "Deleted");
    });
}

// Save individual file to server
function saveFile(file, req, callback) {
    // identifier prefix
    const prefix = Date.now();

    // Directory
    const dir = './uploads/' + req.body.path;
    console.log("DIR", dir);

    // Path to store file
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const pathToFile = dir + '/' + prefix + file.name

    console.log("Path", pathToFile)

    // Url to access file
    // const accessUrl = process.env.BASE_URL + req.body.path + '/' + prefix + encodeURIComponent(file.name);

    file.mv(pathToFile, function (err) {
        callback(err, "accessUrl");
    });
}

// Upload file
exports.uploadFile = function (req, res) {

    console.log("I came here");
    // Check if there are files
    if (!req.files || Object.keys(req.files).length === 0) {
        Response.generalResponse('No files', res, 500);
    }

    // functions
    var functions = [];

    // Check multiple files or single
    if (req.body.isMultiple === 'true') {
        req.files.files.forEach(file => {
            functions.push(function (callback) { saveFile(file, req, callback) });
        })
    } else {
        functions.push(function (callback) { saveFile(req.files.files, req, callback) });
    }

    async.parallel(functions, function (err, result) {
        Response.generalPayloadResponse(err, result, res);
    });
}

// Status change by ID
exports.statusChangeById = function (id, type, res) {
    const model = getModelByType(type);
    model.findByIdAndUpdate(id, { status: 0 }, (err, doc) => {
        Response.generalResponse(err, res, undefined, "Deleted");
    });
}

// Read one by ID
exports.getById = function (id, type, res) {
    const model = getModelByType(type);
    model.findOne({ _id: id }, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    });
}
/* Read by query
    [X] PAGINATION
    [X] SORTING
    [X] LIMIT 
*/
exports.getByQuery = function (query, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    });
}

/* Read n items by query [ NO PAGINATION ]
    [X] PAGINATION
    [X] SORTING
    [/] LIMIT
*/
exports.getByQueryLimit = function (query, limit, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    }).limit(limit);
}

/* Read n items by query [ NO PAGINATION ]
    [X] PAGINATION
    [/] SORTING
    [/] LIMIT
*/
exports.getByQueryLimitAndSort = function (query, limit, sortQuery, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    }).sort(sortQuery).limit(limit);
}

/* Read n items by query [ NO PAGINATION ]
    [X] PAGINATION
    [/] SORTING
    [X] LIMIT
*/
exports.getByQueryAndSort = function (query, sortQuery, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    }).sort(sortQuery);
}

/* Read n items by query [ NO PAGINATION ]
    [/] PAGINATION
    [/] SORTING
    [/] LIMIT
*/
exports.getByQueryPaginate = function (query, limit, sortQuery, page, type, res) {
    const model = getModelByType(type);
    query.status = 1;
    model.find(query, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    }).sort(sortQuery).skip(page * limit).limit(limit);
}

/* Read n items by query [ NO PAGINATION ]
    [/] PAGINATION
    [X] SORTING
    [/] LIMIT
*/
exports.getByQueryPaginateWithoutSort = function (query, limit, page, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        Response.generalPayloadResponse(err, doc, res);
    }).skip(page * limit).limit(limit);
}


// SPECIAL METHODS
// Get doc count
exports.countByQuery = function (query, type, res) {
    const model = getModelByType(type);
    query.status = 1;
    model.countDocuments(query, (err, count) => {
        Response.generalPayloadResponse(err, { count: count }, res);
    });
}