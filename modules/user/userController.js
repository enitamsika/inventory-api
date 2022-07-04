var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var UserModel = require('./userModel.js');
var config = require('../../config');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

        /**
     * userController.login()
     */
         login: function (req, res) {
            var username = req.body.username;
            var password = req.body.password;
    
            UserModel.findOne({username: username}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
    
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found !'
                    });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                  );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                  });
    
                return res.status(200).send({
                    id: user._id,
                    username: user.username,
                    accessToken: token
                })
            });
        },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
			username : req.body.username,
			password : bcrypt.hashSync(req.body.password, 8)
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
