'use strict';

var mongoose = require('mongoose');
var Tracking = mongoose.model('TrackingData');

exports.getAllTrackings = function () {
    return Tracking.find({}).select();
};

exports.getTrackingById = function (id) {
    return Tracking.findById(id).select();
};

exports.getTrackingByDriver = function (driver) {
    return Tracking.find({driver: driver}).select();
};

exports.addTracking = function (newTracking) {
    return newTracking.save();
};

exports.updateTracking = function (id, tracking) {
    return Tracking.update({_id: id}, tracking);
};

exports.deleteTracking = function (id) {
    return Tracking.remove({_id: id});
};
