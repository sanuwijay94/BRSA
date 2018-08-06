const JourneyRoute = require('../models/journey-route');

module.exports.journeyRoutesOfBusRoute = function(busRouteId, callback)
{
    let journeyRoutes = [];

    JourneyRoute.find({'busRoute': busRouteId}, '_id', function (err, result)
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