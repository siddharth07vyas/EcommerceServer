const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const authConfig = require("../config/auth.config");

exports.signUp = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        address: req.body.address,
        mobile: req.body.mobile
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err, success: false });
            return;
        }
        res.send({ success: true, message: "User was registered successfully!" });
    })
}

exports.signIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ success: false, message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ success: false, message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                success: false,
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            id: user._id,
            username: user.name,
            email: user.email,
            accessToken: token
        });

    })
}