const { validate } = require('indicative');

const BusStop = require('../models/busStop');

const busStopMiddleware = require('../middleware/busStopMiddleware');


// Display list of all BusStops
exports.list = function (req, res)
{
    BusStop.find({}, '_id name location', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
            {
                message: "Unable to get all Bus Stops",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    });
};

// Display details of a specific BusStop
exports.details = function (req, res)
{
    BusStop.findById({'_id': req.params.id}, '_id name location', function (err, result)
    {
        if (err||!result)
        {
            return res.status(404).json(
            {
                message: "Unable to get the Bus Stop",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    });
};

// Bus Stop Create on POST
exports.create = function(req, res)
{
    const data = {

        name: req.body.name,

        location: req.body.location
    };

    const rules = {

        name: 'required',

        location: 'required|array'
    };

    validate(data, rules)

    .then(() =>
    {
        const busStop = new BusStop(
        {
            name: req.body.name,

            location: req.body.location
        });

        busStop.save(function (err)
        {
            if (err)
            {
                return res.status(304).json(
                {
                    message: "Unable to create BusStop",

                    error: err
                });
            }
            return res.status(201).json(
            {
                message: "BusStop Created Successfully",

                busStop: busStop
            });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};

// Bus Stop Update on PATCH
exports.update = function(req, res)
{
    const data = {

        name: req.body.name,

        location: req.body.location
    };

    const rules = {

        name: 'required',

        location: 'required|array'
    };

    validate(data, rules)

    .then(() =>
    {

        BusStop.findByIdAndUpdate(req.params.id, req.body, function (err, result)
        {
            if (err||!result)
            {
                return res.status(304).json(
                {
                    message: "Unable to Update BusStop",

                    error: err
                });
            }
            return res.status(201).json(
            {
                message: "BusStop Updated Successfully",

                busStop: result
            });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};

// BusStop delete on DELETE.
exports.delete = function(req, res)
{
    BusStop.findByIdAndDelete(req.params.id, function (err, result)
    {
        if (err||!result)
        {
            return res.status(304).json(
            {
                message: "Unable to Delete BusStop",

                error: err
            });
        }

        //getting all the busRoutes of busStop with the passed busStop Id
        busStopMiddleware.busRoutesOfBusStop(req.params.id, function(busRoutes)
        {
            if (err||!result)
            {
                return res.status(304).json(
                {
                    message: "Unable to get the BusRoutes",

                    error: err
                });
            }

            //delete the busStop Id from all the busRoutes
            for(let i=0; i<busRoutes.length; i++)
            {
                busStopMiddleware.deleteBusStopFromBusRoute(busRoutes[i], req.params.id);
            }
        });

        //getting all the journeyRoutes of busStop with the passed busStop Id
        busStopMiddleware.journeyRoutesOfBusStop(req.params.id, function(journeyRoutes)
        {
            if (err||!result)
            {
                return res.status(304).json(
                {
                    message: "Unable to get the JourneyRoutes",

                    error: err
                });
            }

            //delete the busStop Id from all the journeyRoutes
            for(let i=0; i<journeyRoutes.length; i++)
            {
                busStopMiddleware.deleteBusStopFromJourneyRoute(journeyRoutes[i], req.params.id);
            }

            return res.status(200).json(
            {
                message: "Deleted Successfully",
            });
        });
    });
};