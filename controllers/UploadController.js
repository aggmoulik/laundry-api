const Response = require('../shared/Response'),
    path = require('path'),
    fs = require('fs'),
    async = require('async');

// Save individual file to server
function saveFile(file, req, callback) {

    // identifier prefix
    const prefix = Date.now();

    // Directory
    const dir = path.resolve(__dirname, '../uploads', req.body.path);

    // Path to store file
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const pathToFile = dir + '/' + prefix + file.name

    const BASE_URL = `http://${req.hostname}:3005/`

    // Url to access file
    const accessUrl = BASE_URL + 'uploads/' + req.body.path + '/' + prefix + encodeURIComponent(file.name);

    file.mv(pathToFile, function (err) {
        callback(err, accessUrl);
    });
}

// Upload file
exports.uploadFile = function (req, res) {

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
        functions.push(function (callback) { saveFile(req.files.image, req, callback) });
    }

    async.parallel(functions, function (err, result) {
        Response.generalPayloadResponse(err, result, res);
    });
}