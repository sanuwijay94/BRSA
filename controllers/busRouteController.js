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