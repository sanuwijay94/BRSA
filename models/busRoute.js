const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let BusRouteSchema = new Schema
(
    {
        routeNo: {type: String, required: true},

        distance: {type: Number, required: true},

        stops: [{type: Schema.ObjectId, ref: 'BusStop', required: true}],

        firstStop: {type: Schema.ObjectId, ref: 'BusStop', required: true},

        lastStop: {type: Schema.ObjectId, ref: 'BusStop', required: true},

        avgExtraTime:{type: Number, required: true},

        mainStops:[{type: Schema.ObjectId, ref: 'BusStop'}],

        mainExtraTimes:[{type: Number}]
    }
);

module.exports = mongoose. model('BusRoute', BusRouteSchema);