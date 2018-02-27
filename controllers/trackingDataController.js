'use strict';

const TrackingRepository = require('../repositories/trackingDataRepository');
const Tracking = require('../models/trackingData');
const Datastream = require('stream-array');

exports.getAllTrackings = function (req, res) {
    const promise = TrackingRepository.getAllTrackings();
    promise.then(function (trackings) {
        const read = Datastream(trackings);
        return res.json({success: true, data: (read)});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get trackings', error: err});
    });
};

exports.getDummyDataStreamByDriver = function (req, res){
    const promise = TrackingRepository.getTrackingByDriver(req.params.driver);
    promise.then((trackings) => {

        let index = 0;
        const maxIndex = trackings.length - 1;

        releaseCoordinates();
        function releaseCoordinates(){
            if (index === maxIndex){
                return res.end(JSON.stringify(trackings[index]));
            }
            res.write(JSON.stringify(trackings[index]));
            index++;
            setTimeout(releaseCoordinates, 1000);
        }
    }, function (err) {
        return res.status(500).json({succes: false, error: err});
    });
};

exports.addTracking = function (req, res) {
    const newTracking = new Tracking(req.body);
    const promise = TrackingRepository.addTracking(newTracking);
    promise.then(function (tracking) {
        return res.json({success: true, msg: 'Tracking created', data: tracking});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create tracking', error: err});
    });
};

exports.updateTracking = function (req, res) {
    const promise = TrackingRepository.updateTracking(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Tracking updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update tracking', error: err});
    });
};

exports.getTrackingById = function (req, res) {
    const promise = TrackingRepository.getTrackingById(req.params.id);
    promise.then(function (tracking) {
        return res.json({success: true, data: tracking});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get tracking', error: err});
    });
};

exports.getTrackingByDriver = function (req, res) {
    const promise = TrackingRepository.getTrackingByDriver(req.params.driver);
    promise.then(function (tracking) {
        return res.json({success: true, data: tracking});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get tracking by driver', error: err});
    });
};

exports.deleteTracking = function (req, res) {
    const promise = TrackingRepository.deleteTracking(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Tracking removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove tracking', error: err});
    });
};

