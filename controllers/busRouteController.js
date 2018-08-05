const { validate } = require('indicative');

const BusRoute = require('../models/busRoute');


// Display list of all BusRoutes
exports.list = function (req, res)
{
    BusRoute.find({}, '_id routeNo distance stops firstStop lastStop', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
            {
                message: "Unable to get all Bus Routes",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    }).populate('firstStop lastStop');
};

// Display details of a specific BusRoute
exports.details = function (req, res)
{
    BusRoute.findById({'_id': req.params.id}, '_id routeNo distance stops firstStop lastStop', function (err, result)
    {
        if (err||!result)
        {
            return res.status(404).json(
            {
                message: "Unable to get the Bus Routes",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    }).populate('firstStop lastStop');
};

// Bus Route Create on POST
exports.create = function(req, res)
{
    const data = {

        routeNo: req.body.routeNo,

        distance: req.body.distance,

        stops: req.body.stops,

        firstStop: req.body.firstStop,

        lastStop: req.body.lastStop
    };

    const rules = {

        routeNo: 'required',

        distance: 'required|number',

        stops: 'required|array',

        firstStop: 'required|alpha_numeric',

        lastStop: 'required|alpha_numeric'
    };

    validate(data, rules)

    .then(() =>
    {
        const busRoute = new BusRoute(
        {
            routeNo: req.body.routeNo,

            distance: req.body.distance,

            stops: req.body.stops,

            firstStop: req.body.firstStop,

            lastStop: req.body.lastStop
        });

        busRoute.save(function (err)
        {
            if (err)
            {
                return res.status(304).json(
                {
                    message: "Unable to create BusRoute",

                    error: err
                });
            }
            return res.status(201).json(
            {
                message: "BusRoute Created Successfully",

                busRoute: busRoute
            });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};

// Bus Route Update on PATCH
exports.update = function(req, res)
{
    const data = {

        routeNo: req.body.routeNo,

        distance: req.body.distance,

        stops: req.body.stops,

        firstStop: req.body.firstStop,

        lastStop: req.body.lastStop
    };

    const rules = {

        routeNo: 'required',

        distance: 'required|number',

        stops: 'required|array',

        firstStop: 'required|alpha_numeric',

        lastStop: 'required|alpha_numeric'
    };

    validate(data, rules)

    .then(() =>
    {
        BusRoute.findByIdAndUpdate(req.params.id, req.body, function (err, result)
        {
            if (err||!result)
            {
                return res.status(304).json(
                {
                    message: "Unable to Update BusRoute",

                    error: err
                });
            }
            return res.status(201).json(
            {
                message: "BusRoute Updated Successfully",

                busRoute: result
            });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};