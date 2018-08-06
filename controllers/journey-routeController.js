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
        if (err||!result)
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

// JourneyRoute Update on PATCH
exports.update = function(req, res)
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
        JourneyRoute.findByIdAndUpdate(req.params.id, req.body, function (err, result)
        {
            if (err||!result)
            {
                return res.status(304).json(
                    {
                        message: "Unable to Update JourneyRoute",

                        error: err
                    });
            }
            return res.status(201).json(
                {
                    message: "JourneyRoute Updated Successfully",

                    journeyRoute: result
                });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};

// JourneyRoute delete on DELETE.
exports.delete = function(req, res)
{
    JourneyRoute.findByIdAndDelete(req.params.id, function (err, result)
    {
        if (err||!result)
        {
            return res.status(304).json(
            {
                message: "Unable to Delete JourneyRoute",

                error: err
            });
        }
        else
        {
            return res.status(200).json(
            {
                message: "Deleted Successfully",

                result: result
            });
        }
    });
};
