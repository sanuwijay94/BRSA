const { validate } = require('indicative');
const User = require('../models/user');


// Display list of all Users
exports.user_list = function (req, res)
{
    User.find({}, '_id name work age email username password', function (err, result)
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