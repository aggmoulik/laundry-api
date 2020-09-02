const ResponseService = require('../shared/Response'); // Response service
const User = require('../models/usersModel'); // Model

exports.notificationID = function(req, res) {
    query = {};
    if (req.body.isAdd) {
        query.$addToSet = { notification_ids: req.body.notification_id }
    } else {
        query.$pull = { notification_ids: req.body.notification_id }
    }

    User.findByIdAndUpdate(req.body.id, query, { new: true }, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res, undefined, "Done");
    })
}

exports.getById = function(id, callback) {
    User.findById(id, (err, doc) => {
        callback(err, doc);
    })
}