const { validate } = require('indicative');

const JourneyRoute = require('../models/journey-route');


// Display list of all JourneyRoutes
exports.list = function (req, res)
{
    JourneyRoute.find({}, '_id busRoute journey distance stops', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
                {
                    message: "Unable to get all JourneyRoutes",

                    error: err
                });
        }
        else
        {
            return res.status(200).json(result);
        }
    })
    .populate('busRoute journey');
};


// Display details for a specific JourneyRoute
exports.details = function (req, res)
{
    JourneyRoute.findById({'_id': req.params.id}, '_id busRoute journey distance stops', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
                {
                    message: "Unable to get the JourneyRoute",

                    error: err
                });
        }
        else
        {
            return res.status(200).json(result);
        }
    })
    .populate('busRoute journey');
};

// JourneyRoute Create on POST
exports.create = function(req, res)
{
    const data = {

        busRoute: req.body.busRoute,

        journey: req.body.journey,

        distance: req.body.distance,

        stops: req.body.stops,
    };

    const rules = {

        busRoute: 'required|alpha_numeric',

        journey: 'required|alpha_numeric',

        distance: 'required|number',

        stops: 'required|array'
    };

    validate(data, rules)

    .then(() =>
    {
        const journeyRoute = new JourneyRoute(
        {
            busRoute: req.body.busRoute,

            journey: req.body.journey,

            distance: req.body.distance,

            stops: req.body.stops,
        });

        journeyRoute.save(function (err)
        {
            if (err)
            {
                return res.status(304).json(
                    {
                        message: "Unable to create JourneyRoute",

                        error: err
                    });
            }
            return res.status(201).json(
                {
                    message: "JourneyRoute Created Successfully",

                    journeyRoute: journeyRoute
                });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};