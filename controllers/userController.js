const { validate } = require('indicative');

const User = require('../models/user');


// Display list of all Users
exports.list = function (req, res)
{
    User.find({}, '_id name work age email username password', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
            {
                message: "Unable to get all Users",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    });
};

// Display detail page for a specific User.
exports.details = function(req, res)
{
    User.findById({'_id': req.params.id}, '_id name work age email username password', function (err, result) {
        if (err)
        {
            return res.status(404).json(
            {
                message: "Unable to get the user",

                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    });
};