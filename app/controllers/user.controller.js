exports.GetAllUsers = (req, res) =>{
    res.status(200).send({ success: false, user: res.userId });
}