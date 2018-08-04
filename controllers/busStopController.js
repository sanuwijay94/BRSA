const { validate } = require('indicative');

const BusStop = require('../models/busStop');


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
        if (err)
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