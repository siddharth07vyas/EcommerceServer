const db = require('../models');
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ success: false, message: err });
            return;
        }
        if (user) {
            res.status(400).send({success: false, message: "Failed! Email is already in use!" });
            return;
        }
        next();
    })
}

const verifySignUp = {
    checkDuplicateEmail
}
module.exports = verifySignUp;