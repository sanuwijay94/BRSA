// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb://'))
{
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');

    return
}

const async = require('async');

const User = require('./models/user');

const BusRoute = require('./models/busRoute');

const Journey = require('./models/journey');

const JourneyRoute = require('./models/journey-route');

const BusStop = require('./models/busStop')

const mongoose = require('mongoose');

const mongoDB = userArgs[0];

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];

const busRoutes = [];

const journeys = [];

const busStops = [];

function userCreate(cb)
{
    const user = new User(
    {
        name: 'Sanura',

        type: 'Admin',

        home: [],

        work: [],

        age: 21,

        email: 'sanura@gmail.com',

        username: 'sanuwijay94',

        password: 'admin'
    });

    const user1 = new User(
    {
        name: 'Dinura',

        type: 'General',

        home: [ 96.1822483, 20.6507869 ],

        work: [ 109.8277286, 10.2307733 ],

        age: 24,

        email: 'dinura@gmail.com',

        username: 'dinur-el',

        password: 'admin'
    });

    user.save( function (err)
    {
        if (err)
        {
            cb('user', null);

            return;
        }
        user1.save( function (err)
        {
            if (err)
            {
                cb('user1', null);

                return;
            }
            console.log('New User1: ' + user);

            users.push(user);

            console.log('New User2: ' + user1);

            users.push(user1);

            cb(null, user)
        });
    })
}



function busStopCreate(cb)
{
    const busStop = new BusStop(
    {
        name: 'Homagama',

        location: [ 96.1822483, 20.6507869 ]
    });

    const busStop1 = new BusStop(
    {
        name: 'Pettah',

        location: [ 91.1322676, 21.1303833 ]
    });

    const busStop2 = new BusStop(
    {
        name: 'Kottawa',

        location: [ 86.1326731, 27.538432 ]
    });

    const busStop3 = new BusStop(
    {
        name: 'Malabe',

        location: [ 71.2632672, 13.0312748 ]
    });

    busStop.save( function (err)
    {
        if (err)
        {
            cb('busStop', null);

            return;
        }
        busStop1.save( function (err)
        {
            if (err)
            {
                cb('busStop1', null);

                return;
            }
            busStop2.save( function (err)
            {
                if (err)
                {
                    cb('busStop2', null);

                    return;
                }
                busStop3.save( function (err)
                {
                    if (err)
                    {
                        cb('busStop3', null);

                        return;
                    }
                    console.log('New BusStop1: ' + busStop);

                    busStops.push(busStop);

                    console.log('New BusStop2: ' + busStop1);

                    busStops.push(busStop1);

                    console.log('New BusStop3: ' + busStop2);

                    busStops.push(busStop2);

                    console.log('New BusStop4: ' + busStop3);

                    busStops.push(busStop3);

                    cb(null, busStop)
                });
            });
        });
    })
}





function journeyCreate(cb)
{
    const journey = new Journey(
    {
        date: '2017-08-06',

        startedAt: '2017-08-06 16:33:05.000',

        endedAt: '2017-08-06 17:55:39.000',

        walkingDistance: 0.5,

        user: users[0]
    });

    const journey1 = new Journey(
    {
        date: '2018-01-06',

        startedAt: '2017-01-06 20:54:20.000',

        endedAt: '2017-08-06 21:27:14.000',

        walkingDistance: 0.2,

        user: users[0]
    });

    const journey2 = new Journey(
    {
        date: '2018-02-26',

        startedAt: '2018-02-26 08:04:23.000',

        endedAt: '2018-02-26 10:44:53.000',

        walkingDistance: 1.2,

        user: users[1]
    });

    journey.save(function (err)
    {
        if (err)
        {
            cb('journey1', null);

            return;
        }

        journey1.save(function (err)
        {
            if (err)
            {
                cb('journey2', null);

                return;
            }

            journey2.save(function (err)
            {
                if (err)
                {
                    cb('journey3', null);

                    return;
                }

                console.log('New Journey1: ' + journey);

                journeys.push(journey);

                console.log('New Journey2: ' + journey1);

                journeys.push(journey1);

                console.log('New Journey3: ' + journey2);

                journeys.push(journey2);

                cb(null, journey);
            });
        });
    });
}

function busRouteCreate(cb)
{
    const busRoute = new BusRoute(
    {
        routeNo: '138',

        distance: 16.4,

        stops: [busStops[0], busStops[1]],

        firstStop: busStops[0],

        lastStop: busStops[1],

        avgExtraTime: 0.5,

        mainStops:[],

        mainExtraTimes:[]
    });

    const busRoute1 = new BusRoute(
    {
        routeNo: '336',

        distance: 8.7,

        stops: [busStops[2], busStops[3]],

        firstStop: busStops[2],

        lastStop: busStops[3],

        avgExtraTime: 0.36,

        mainStops:[busStops[2]],

        mainExtraTimes:[4.73]
    });

    busRoute.save(function (err)
    {
        if (err)
        {
            cb('busRoute', null);

            return
        }

        busRoute1.save(function (err)
        {
            if (err)
            {
                cb('busRoute1', null);

                return
            }

            console.log('New BusRoute1' + busRoute);

            busRoutes.push(busRoute);

            console.log('New BusRoute2 ' + busRoute1);

            busRoutes.push(busRoute1);

            cb(null, busRoute);
        });
    });
}

function journeyRouteCreate(cb)
{
    const journeyRoute = new JourneyRoute(
    {
        busRoute: busRoutes[0],

        journey: journeys[0],

        distance: 4.4,

        stops: [busStops[0], busStops[1]]
    });

    const journeyRoute1 = new JourneyRoute(
    {
        busRoute: busRoutes[0],

        journey: journeys[1],

        distance: 2.4,

        stops: [busStops[0], busStops[1]]
    });

    const journeyRoute2 = new JourneyRoute(
    {
        busRoute: busRoutes[1],

        journey: journeys[0],

        distance: 8.7,

        stops: [busStops[2], busStops[3]]
    });

    const journeyRoute3 = new JourneyRoute(
    {
        busRoute: busRoutes[1],

        journey: journeys[1],

        distance: 5.0,

        stops: [busStops[2], busStops[3]]
    });

    journeyRoute.save(function (err)
    {
        if (err)
        {
            cb('journeyRoute1', null);

            return
        }

        journeyRoute1.save(function (err)
        {
            if (err)
            {
                cb('journeyRoute2', null);

                return
            }
            journeyRoute2.save(function (err)
            {
                if (err)
                {
                    cb('journeyRoute3', null);

                    return
                }
                journeyRoute3.save(function (err)
                {
                    if (err)
                    {
                        cb('journeyRoute4', null);

                        return
                    }
                    console.log('New JourneyRoute1: ' + journeyRoute);

                    console.log('New JourneyRoute2: ' + journeyRoute1);

                    console.log('New JourneyRoute3: ' + journeyRoute2);

                    console.log('New JourneyRoute4: ' + journeyRoute3);

                    cb(null, journeyRoute);
                });
            });
        });
    });
}


async.series(
[
    userCreate,

    busStopCreate,

    journeyCreate,

    busRouteCreate,

    journeyRouteCreate
],

// Optional callback
function(err, results)
{
    if (err)
    {
        console.log('FINAL ERR: '+err);
    }
    else
    {
        console.log('All done');
    }

    // All done, disconnect from database
    mongoose.connection.close();
});



