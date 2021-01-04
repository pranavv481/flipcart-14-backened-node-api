const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) {
                return res.status(400).json({
                    message: "User Already Registered"
                })
            }

            console.log(req.body)
           
            const { firstname, lastname, email, password } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            // const _user = new User({
            //     firstName,
            //     lastName,
            //     email,
            //     hash_password,
            //     username: shortid.generate(),
            // });
            const _user = new User({
                firstname,
                lastname,
                email,
                hash_password,
                username: Math.random().toString()
            })
            console.log(_user)

            _user.save((error, data) => {
                if (error) {
                    res.status(400).json({
                        message: "Something Went Wrong", error
                    })
                }
                if (data) {
                    res.status(201).json({
                        user: "User Created Successfully"
                    })
                }
            })
        })
}

exports.signin = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .exec(async(error, user) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            if (user) {
                console.log(user)
                const validate =await bcrypt.compare(req.body.password,user.hash_password)
                if  ((validate==true) && user.role === 'user') {
                    var token = jwt.sign({ _id: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    console.log()
                    const {_id, firstname, lastname, email, role, fullname } = user;
                    res.status(200).json({
                        token,
                        user: {
                          _id, firstname, lastname, email, role, fullname
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: "Invalid Password"
                    })
                }
            } else {
                return res.status(400).json({ message: "something went wrong" })
            }
        })
}

