const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let JourneySchema = new Schema
(
    {
        date: {type: Date, required: true},

        startedAt: {type: Date, required: true},

        endedAt: {type: Date, required: true},

        walkingDistance: {type: Number},

        user: {type: Schema.ObjectId,ref: 'User', required: true}
    }
);

module.exports = mongoose. model('Journey', JoureySchema);