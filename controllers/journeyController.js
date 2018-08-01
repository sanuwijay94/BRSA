const { validate } = require('indicative');

const Journey = require('../models/journey');


// Display list of all Journeys
exports.list = function (req, res)
{
    Journey.find({}, '_id date startedAt endedAt walkingDistance user', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
                {
                    message: "Unable to get all Journeys",

                    error: err
                });
        }
        else
        {
            return res.status(200).json(result);
        }
    })
    .populate('user');
};


// Display details for a specific Journeys
exports.details = function (req, res)
{
    Journey.findById({'_id': req.params.id}, '_id date startedAt endedAt walkingDistance user', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
                {
                    message: "Unable to get the Journey",

                    error: err
                });
        }
        else
        {
            return res.status(200).json(result);
        }
    })
        .populate('user');
};