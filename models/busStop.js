const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let BusStopSchema = new Schema
(
    {
        name: {type: String, required: true},

        location: {type: [Number], index: { type: '2dsphere', sparse: true}}
    }
);

module.exports = mongoose. model('BusStop', BusStopSchema);