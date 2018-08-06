const { validate } = require('indicative');

const User = require('../models/user');

const Journey = require('../models/journey');

const JourneyRoute = require('../models/journey-route');

const userMiddleware = require('../middleware/userMiddleware');

// Display list of all Users
exports.list = function (req, res)
{
    User.find({}, '_id name type home work age email username password', function (err, result)
    {
        if (err)
        {
            return res.status(404).json(
            {
                message: "Unable to get all Users",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    });
};

// Display detail page for a specific User.
exports.details = function(req, res)
{
    User.findById({'_id': req.params.id}, '_id name type home work age email username password', function (err, result) {
        if (err||!result)
        {
            return res.status(404).json(
            {
                message: "Unable to get the user",

                error: err
            });
        }
        else
        {
            return res.status(200).json(result);
        }
    });
};

// User Create on POST
exports.create = function(req, res)
{
    const data = {

        name: req.body.name,

        type: req.body.type,

        home: req.body.home,

        work: req.body.work,

        age: req.body.age,

        email: req.body.email,

        username: req.body.username,

        password: req.body.password
    };

    const rules = {

        name: 'required',

        type: 'required|in:Admin,General',

        home: 'array',

        work: 'array',

        age: 'integer',

        email: 'email',

        username: 'required',

        password: 'required|min:4|max:40'
    };

    validate(data, rules)

    .then(() =>
    {
        const user = new User(
        {
            name: req.body.name,

            type: req.body.type,

            home: req.body.home,

            work: req.body.work,

            age: req.body.age,

            email: req.body.email,

            username: req.body.username,

            password: req.body.password
        });

        user.save(function (err)
        {
            if (err)
            {
                return res.status(304).json(
                {
                    message: "Unable to create User",

                    error: err
                });
            }
            return res.status(201).json(
            {
                message: "User Created Successfully",

                user: user
            });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};

// User Update on PATCH
exports.update = function(req, res)
{
    const data = {

        name: req.body.name,

        type: req.body.type,

        home: req.body.home,

        work: req.body.work,

        age: req.body.age,

        email: req.body.email,

        username: req.body.username,

        password: req.body.password
    };

    const rules = {

        name: 'required',

        type: 'required|in:Admin,General',

        home: 'array',

        work: 'array',

        age: 'integer',

        email: 'email',

        username: 'required',

        password: 'required|min:4|max:40'
    };

    validate(data, rules)

    .then(() =>
    {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, result)
        {
            if (err||!result)
            {
                return res.status(304).json(
                {
                    message: "Unable to Update User",

                    error: err
                });
            }
            return res.status(201).json(
            {
                message: "User Updated Successfully",

                user: result
            });
        });
    })
    .catch((errors) =>
    {
        return res.json(errors);
    });
};

// User delete on DELETE.
exports.delete = function(req, res)
{
    //Delete User by id passed as params
    User.findByIdAndDelete(req.params.id, function (err, result)
    {
        if (err||!result)
        {
            return res.status(304).json(
            {
                message: "Unable to Delete User",

                error: err
            });
        }
        else
        {
            //getting all the journeys of user by passing user Id
            userMiddleware.journeysOfUser(req.params.id, function(journeys) {

                //delete all the journeys of user specified by the passed user Id
                Journey.deleteMany({'user': req.params.id}, function (err, result)
                {
                    if (err||!result)
                    {
                        return res.status.json(304)(
                        {
                            message: "Unable to Delete Journey",

                            error: err
                        });
                    }

                    else
                    {
                        //Delete all the journeyRoutes of each Journey
                        for (let j = 0; j < journeys.length; j++)
                        {
                             JourneyRoute.deleteMany({'journey': journeys[j]}, function (err, result)
                             {
                                if (err||!result)
                                {
                                    return res.status.json(304)(
                                    {
                                        message: "Unable to Delete JourneyRoutes",

                                        error: err
                                    });
                                }
                            });
                        }
                    }
                });
                return res.status(200).json(
                {
                    message: "Deleted Successfully",

                    result: result
                });
            });
        }
    });
};
