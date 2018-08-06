const jwt = require('jsonwebtoken');

const User = require('../models/user');

foundUser=function(req, res, user)
{
    // Wrong password
    if (user.password !== req.body.password)
    {
        res.status(401).json(
        {
            success: false,

            message: 'Authentication failed. Wrong password.'
        });
    }

    // Correct Password
    else
    {
        const tokenDetails = {

            username: user.username,

            name: user.name
        };

        // Create token
        let token = jwt.sign(tokenDetails, 'secret',
        {
            expiresIn: '50m'
        });

        //add user type for the token
        switch(user.type)
        {
            case 'General':

                token = token+'G';

                console.log('General');

                break;

            case 'Admin':

                token = token+'A';

                console.log('Admin');

                break;

            default:

                console.log('no type');

                return res.json(
                {
                    error: 'User type not found',
                });
        }

        //console.log(result);
        return res.json(
        {
            success: true,

            message: 'Successfully logged in',

            token: token,

            user: user
        });
    }
};


exports.login = function(req, res) {
    User.findOne({username: req.body.username},'_id name email type username password ', function (err, user)
    {
        if (err || !user)
        {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }

        else {
            foundUser(req, res, user)
        }
    });
};




