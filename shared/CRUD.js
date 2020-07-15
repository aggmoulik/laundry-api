let Response = require('../shared/Response');

// Return model by type
function getModelByType(type) {
    return require(type);
}

// Return new model instance by type
function createNewModelInstanceByName(type, val) {
    return new require(type)(val);
}

// Get All documents
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