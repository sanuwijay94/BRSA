const Journey = require('../models/journey');


module.exports.journeysOfUser = function(userId, callback)
{
    let journeys = [];

    Journey.find({'user': userId}, '_id', function (err, result)
    {
        if (err)
        {
            return json(err);
        }

        for(let i=0; i<result.length; i++)
        {
            journeys[i] = result[i]._id;
        }

        return callback(journeys);
    })
};