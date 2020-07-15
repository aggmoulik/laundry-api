function createJSONResponse(status, message, doc) {
    return {
        status: status,
        message: message,
        result: doc,
    }
}

function createErrorJSONResponse(status, error) {
    return {
        status: status,
        error: error
    }
}

// Return 200 Response
exports.success = (res, status = 200, message = "Success", doc) => res.status(200).json(createJSONResponse(status, message, doc));

// Error Response
exports.error = (res, status = 401, error) => res.status(401).json(createErrorJSONResponse(status, error));


// General response without a payload
exports.generalResponse = function (err, res, status = 200, message = "Success") {
    if (err !== null) {
        res.status(501).json({
            status: 404,
            msg: err //"Error!"
        })
    } else {
        res.status(200).json({
            status: status,
            msg: message
        })
    }
};


// General response with a payload
exports.generalPayloadResponse = function (err, payload, res, status = 200, message = "Success") {
    if (err !== null) {
        res.status(501).json({
            status: 404,
            msg: err //"Error!"
        })
    } else {
        res.status(200).json({
            status: status,
            msg: message,
            data: payload
        })
    }
};