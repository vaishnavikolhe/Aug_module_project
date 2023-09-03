const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { varifyEmailAndUsernameExists } = require("../utils/varifyEmailAndUsernameExists");

const SAULT_ROUNDS = parseInt(process.env.SAULT_ROUNDS);

const registerUser = async (req, res) => {
    const isValid = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required()
    }).validate(req.body);

    if (isValid.error) {
        return res.send({
            status: 400,
            message: "Invalid Input",
            data: isValid.error
        })
    }

    const usernameEmailVarify = await varifyEmailAndUsernameExists(req.body.email,req.body.username);
    
    if(usernameEmailVarify === "E"){
        res.status(400).send({
            status:400,
            message:"Email already exist !"
        })
        return
    }else if(usernameEmailVarify === "U"){
        res.status(400).send({
            status:400,
            message:"Username already exist !"
        })
        return;
    }else if(usernameEmailVarify === "Err"){
        res.status(400).send({
            status:400,
            message:"Something went wrong !"
        })
        return 
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SAULT_ROUNDS);

    const userObj = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        userObj.save();
        res.status(201).send({ status: 201, message: 'User Created Succefully', data: [] })
    } catch (err) {
        res.send({ status: 500, message: "DB error : user creation failed", data: err });
    }

}

const loginuser = async (req, res) => {
    const { loginId, password } = req.body;
    let userData;
    const isValid = Joi.object({
        email: Joi.string().email().required()
    }).validate(loginId);


    try {
        if (isValid.error) {
            userData = await User.findOne({ username: loginId });
        } else {
            userData = await User.findOne({ email: loginId });
        }
        // console.log("userData",userData)
        if (!userData) {
            return res.status(400).send({
                status: 400,
                message: "No user found please register first or check credentials"
            })
        }

        //updating express session 
        req.session.isAuth = true;
        req.session.user = {
            username: userData.username,
            email: userData.email,
            userId: userData._id
        }

        //password match or not 
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (isPasswordValid) {
            return res.status(200).send({ status: 200, message: "successfully Logged In !",data:req.session.user });
        } else {
            return res.status(400).send({ status: 400, message: "Incorrect Password !" });
        }

    } catch (err) {
        res.send({ status: 500, message: "DB error : user creation failed", data: err });
    }
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send({ status: 400, message: "Logout Unsuccessful !", Error: err });
        }
        return res.status(200).send({ status: 200, message: "Logged Out Succesfully !" })
    });
}

module.exports = { registerUser, loginuser, logoutUser };