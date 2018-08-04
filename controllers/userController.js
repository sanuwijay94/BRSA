const { validate } = require('indicative');

const User = require('../models/user');


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
        if (err)
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

        home: 'number',

        work: 'number',

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