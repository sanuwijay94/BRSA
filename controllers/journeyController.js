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


// Display details for a specific Journey
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

// Journey Create on POST
exports.create = function(req, res)
{
    const data = {

        date: req.body.date,

        startedAt: req.body.startedAt,

        endedAt: req.body.endedAt,

        walkingDistance: req.body.walkingDistance,

        user: req.body.user
    };

    const rules = {

        date: 'required|date',

        startedAt:'required|date',

        endedAt: 'required|date',

        walkingDistance: 'number',

        user: 'required|alpha_numeric'
    };

    validate(data, rules)

    .then(() =>
    {
        const journey = new Journey(
        {
            date: req.body.date,

            startedAt: req.body.startedAt,

            endedAt: req.body.endedAt,

            walkingDistance: req.body.walkingDistance,

            user: req.body.user
        });

        journey.save(function (err)
        {
            if (err)
            {
                return res.status(304).json(
                    {
                        message: "Unable to create Journey",

                        error: err
                    });
            }
            return res.status(201).json(
                {
                    message: "Journey Created Successfully",

                    journey: journey
                });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};