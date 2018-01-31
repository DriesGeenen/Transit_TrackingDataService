'use strict';

var TrackingRepository = require('../repositories/trackingDataRepository');
var Tracking = require('../models/trackingData');
var Datastream = require('stream-array');

exports.getAllTrackings = function (req, res) {
    var promise = TrackingRepository.getAllTrackings();
    promise.then(function (trackings) {
        var read = Datastream(trackings);
        return res.json({success: true, data: (read)});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get trackings', error: err});
    });
};

exports.makeDatastream = function (req, res){
    var promise = Datastream.makeDatastream();
    promise.then(function (trackings) {

        return Datastream(trackings);
    }, function (err) {
        return res.status(500).json({succes: false, error: err});
    });
};

exports.addTracking = function (req, res) {
    var newTracking = new Tracking(req.body);
    var promise = TrackingRepository.addTracking(newTracking);
    promise.then(function (tracking) {
        return res.json({success: true, msg: 'Tracking created', data: tracking});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create tracking', error: err});
    });
};

exports.updateTracking = function (req, res) {
    var promise = TrackingRepository.updateTracking(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Tracking updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update tracking', error: err});
    });
};

exports.getTrackingById = function (req, res) {
    var promise = TrackingRepository.getTrackingById(req.params.id);
    promise.then(function (tracking) {
        return res.json({success: true, data: tracking});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get tracking', error: err});
    });
};

exports.getTrackingByTruck = function (req, res) {
    var promise = TrackingRepository.getTrackingByTruck(req.params.truck);
    promise.then(function (tracking) {
        return res.json({success: true, data: tracking});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get tracking by truck', error: err});
    });
};

exports.deleteTracking = function (req, res) {
    var promise = TrackingRepository.deleteTracking(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Tracking removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove tracking', error: err});
    });
};

