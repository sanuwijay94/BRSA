const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let BusRouteSchema = new Schema
(
    {
        routeNo: {type: String, required: true},

        distance: {type: Number, required: true},

        stopCount: {type: Number, required: true},

        firstStop: {type: String, required: true},

        lastStop: {type: String, required: true}
    }
);

module.exports = mongoose. model('BusRoute', BusRouteSchema);