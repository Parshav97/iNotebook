const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Haryisagoodb$oy'

// Create a user using: POST "/api/auth/createuser". Doesn't Require Auth
// if we want to use request.body then we have to use a middle ware----express.json()
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // const user = User(req.body);
    // user.save()
    // res.send(req.body)

    // ROUTE 1: Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        // .then(user =>res.json(user))
        // .catch(err=> {
        //     console.log(err)
        //     res.json({error:'Please enter a unique value for email', meessage:err.message})
        // });
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken)
        // res.json(user)
        success = true;
        res.json({ success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }

})

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success, error:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken})

    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

// ROUTE 3: Get loggdin User Details using: POST "/api/auth/getuser" . Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router