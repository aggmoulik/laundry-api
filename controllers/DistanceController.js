const Response = require('../shared/Response'),
    CRUD = require('../shared/CRUD'),
    Model = require('../shared/TYPES').DISTANCE,
    Distance = require('../models/distanceModel');

const RADIUS_EARTH = 6371;

function convertDegreeToRadian(deg) {
    return deg * (Math.PI / 180);
}

function getDistanceBetweenTwoCordinates(lat1, lng1, lat2, lng2) {

    const dLat = convertDegreeToRadian(lat2 - lat1);
    const dLng = convertDegreeToRadian(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat * 2) +
        Math.cos(convertDegreeToRadian(lat1)) * Math.cos(convertDegreeToRadian(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const DISTANCE_IN_KM = RADIUS_EARTH * c;
    return DISTANCE_IN_KM.toFixed(1);
}

module.exports.addDeliveryPlan = (req, res) => CRUD.create(req.body, Model, res);

module.exports.getPlan = (req, res) => {
    const { lat1, lng1, lat2, lng2 } = req.body.location;
    const distance = getDistanceBetweenTwoCordinates(lat1, lng1, lat2, lng2);
    Distance.find(
        {
            "max_distance": { $gte: distance },
            "min_distance": { $lte: distance }
        }, (err, doc) => {
            Response.generalPayloadResponse(err, {
                charges: doc[0].charge.toString()
            }, res, 200, "OK");
        });
};

module.exports.getAllDistances = (req, res) => CRUD.getAll(req, Model, res);