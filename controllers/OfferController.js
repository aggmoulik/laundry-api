const Response = require('../shared/Response'),
    Offer = require('../models/offerModel');

module.exports.addOffer = (req, res) => {
    const offer = new Offer(req.body);
    // let [date, month, year] = req.body.start_date.split('/');
    // let start_date = new Date(date);
    // let end_date = new Date().setMinutes(start_date.getMinutes() + 10);
    // offer.start_date = start_date;
    // offer.end_date = end_date;

    offer.save((err, data) => {
        Response.generalPayloadResponse(err, data, res);
    });
}