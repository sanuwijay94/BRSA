const { validate } = require('indicative');

const BusRoute = require('../models/busRoute');


// Display list of all BusRoutes
exports.list = function (req, res)
{
    BusRoute.find({}, '_id routeNo distance stopCount firstStop lastStop', function (err, result)
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
    });
};

// Display details of a specific BusRoutes
exports.details = function (req, res)
{
    BusRoute.findById({'_id': req.params.id}, '_id routeNo distance stopCount firstStop lastStop', function (err, result)
    {
        if (err)
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
    });
};
// Bus Route Create on POST
exports.create = function(req, res)
{
    const data = {

        routeNo: req.body.routeNo,

        distance: req.body.distance,

        stopCount: req.body.stopCount,

        firstStop: req.body.firstStop,

        lastStop: req.body.lastStop
    };

    const rules = {

        routeNo: 'required|integer',

        distance: 'required|number',

        stopCount: 'required|integer',

        firstStop: 'required',

        lastStop: 'required'
    };

    validate(data, rules)

    .then(() =>
    {
        const busRoute = new BusRoute(
            {
                routeNo: req.body.routeNo,

                distance: req.body.distance,

                stopCount: req.body.stopCount,

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