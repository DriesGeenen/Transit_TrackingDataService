'use strict';

module.exports = function (app) {
    var TrackingDataController = require('../controllers/trackingDataController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/trackings')
        .get(TrackingDataController.getAllTrackings)
        .post(TrackingDataController.addTracking);

    app.route('/trackings/:id')
        .get(TrackingDataController.getTrackingById)
        .delete(TrackingDataController.deleteTracking)
        .put(TrackingDataController.updateTracking);

    app.route('/trackings/truck/:truck')
        .get(TrackingDataController.getTrackingByTruck);
};