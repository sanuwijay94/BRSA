const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema
(
    {
        name: {type: String, required: true},

        type: {type: String, enum:['Admin','General'], required: true},

        home: {type: [Number], index: { type: '2dsphere', sparse: true}},

        work: {type: [Number], index: { type: '2dsphere', sparse: true}},

        age: {type: Number},

        email: {type: String},

        username: {type: String, required: true, index: { unique: true }},

        password: {type: String, required: true}
    }
);

module.exports = mongoose. model('User', UserSchema);