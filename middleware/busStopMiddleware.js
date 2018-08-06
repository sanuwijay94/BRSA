const BusRoute = require('../models/busRoute');

const JourneyRoute = require('../models/journey-route');

module.exports.deleteBusStopFromBusRoute = function(busRouteId, busStopId)
{
    BusRoute.findById({'_id': busRouteId}, 'stops', function (err, result)
    {
        if (err)
        {
            return json(err);
        }

        const index = result['stops'].indexOf(busStopId);

        if (index !== -1)
        {
            result['stops'].splice(index, 1);
        }

        BusRoute.update({'_id': busRouteId}, {$set: { 'stops': result['stops'] }}, function (err, result)
        {
            if (err)
            {
                return json(err);
            }

            return result['stops'];
        })
    })
};


module.exports.busRoutesOfBusStop = function(busStopId, callback)
{
    let busRoutes = [];

    BusRoute.find({'stops': busStopId}, '_id', function (err, result)
    {
        if (err)
        {
            return json(err);
        }

        for(let i=0; i<result.length; i++)
        {
            busRoutes[i] = result[i]._id;
        }

        return callback(busRoutes);
    })
};


module.exports.deleteBusStopFromJourneyRoute = function(journeyRouteId, busStopId)
{
    JourneyRoute.findById({'_id': journeyRouteId}, 'stops', function (err, result)
    {
        if (err)
        {
            return json(err);
        }

        const index = result['stops'].indexOf(busStopId);

        if (index !== -1)
        {
            result['stops'].splice(index, 1);
        }

        JourneyRoute.update({'_id': journeyRouteId}, {$set: { 'stops': result['stops'] }}, function (err, result)
        {
            if (err)
            {
                return json(err);
            }

            return result['stops'];
        })
    })
};


module.exports.journeyRoutesOfBusStop = function(busStopId, callback)
{
    let journeyRoutes = [];

    JourneyRoute.find({'stops': busStopId}, '_id', function (err, result)
    {
        if (err)
        {
            return json(err);
        }

        for(let i=0; i<result.length; i++)
        {
            journeyRoutes[i] = result[i]._id;
        }

        return callback(journeyRoutes);
    })
};




