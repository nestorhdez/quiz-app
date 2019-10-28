const Users = require("../models/user-model");
const authJWT = require("../helpers/jwt");

const getUsers = (req, res) => {
    Users.find()
        .then(users => res.send({res: users}) )
        .catch(error => res.status(404).send({error}) );
}

const getUserById = (req, res) => {
    Users.findById(req.params.id)
        .then(user => res.send({res: user}) )
        .catch(error => res.status(404).send({error}) );
}

const editUser = (req, res) => {
    delete req.body.role;
    Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(user => res.send({res: user}) )
        .catch(error => res.status(404).send({error}) );
}

const deleteUser = (req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(user => res.send({res: user}) )
        .catch(error => res.status(404).send({error}) )
}

const responseToken = (user) => {
    let dataToken = authJWT.createToken(user);
    let userResponse = {
        access_token: dataToken[0],
        refresh_token: authJWT.createRefreshToken(user),
        expires_in: dataToken[1],
        role: user.role
    };
    return userResponse;
}

const signUp = (req, res) => {
    req.body.role = 'ROLE_USER';
    Users.create(req.body)
        .then(user => res.status(200).send(responseToken(user)))
        .catch(err => res.status(404).send({err}) );
}

const logIn = (req, res) => {
    if (req.body.password && req.body.email) {
        Users.findOne({
                email: req.body.email
            })
            .select("_id password role")
            .exec((err, userResult) => {
                if (err || !userResult) {
                    return res.status(401).send({ error: "LoginError" });
                }
                userResult.comparePassword(req.body.password, userResult.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        return res.status(200).send(responseToken(userResult));
                    } else {
                        return res.status(401).send({ error: "LoginError" });
                    }
                });

            });
    } else {
        return res.status(401).send({ error: "BadRequest" });
    }
}

module.exports = {
    signUp,
    logIn,
    getUsers,
    getUserById,
    editUser,
    deleteUser
}