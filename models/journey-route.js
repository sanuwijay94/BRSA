const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let journeyRouteSchema = new Schema
(
    {
        busRoute: {type: Schema.ObjectId, ref: 'BusRoute', required: true},
        journey: {type: Schema.ObjectId, ref: 'Journey', required: true},
        distance: {type: Number, required: true},
        stops: [{type: Schema.ObjectId, ref: 'BusStop', required: true}]
    }
);

module.exports = mongoose. model('Journey-Route', journeyRouteSchema);