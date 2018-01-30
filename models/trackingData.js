const mongoose = require('mongoose');

const trackingDataSchema = mongoose.Schema({
    longitude : {
        type: String,
        required: true
    },
    latitude : {
        type: String,
        required: true
    },
    truck : {
        type: String,
        required: true
    }
});

const TrackingData = module.exports = mongoose.model('TrackingData', trackingDataSchema);