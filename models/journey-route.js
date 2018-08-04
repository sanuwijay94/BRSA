const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let journeyRouteSchema = new Schema
(
    {
        busRoute: {type: Schema.ObjectId, ref: 'BusRoute', required: true},
        journey: {type: Schema.ObjectId, ref: 'Journey', required: true},
        distance: {type: Number},
        stops: [{type: Schema.ObjectId, ref: 'BusStops', required: true}]
    }
);

module.exports = mongoose. model('Journey-Route', journeyRouteSchema);