const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.post('/registration', [
    body('name', 'Enter a valid name').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 1 }),], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let success = false
        try {
            const findUser = await user.findOne({ email: req.body.email })
            if (findUser) {
                return res.status(400).send({ success, "error": "email already exists" })
            }
            const userPass = req.body.password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(userPass, salt)
            
            const userData = new user({
                name: req.body.name,
                email: req.body.email,
                password : hashPass
            })

            const savedData =  await userData.save()
                .then(() => {
                    success = true
                    return res.send({success});
                })
                .catch(err => {
                    success = false
                    return res.status(400).send({ success, "error": "unable to save data into DB" });
                });
        }
        catch(error) {
            console.log(error, "internal server error found")
        }

    })


    router.post('/login', async (req, res) => {
        let success = false
        try{
        const findUser = await user.findOne({email: req.body.email})

        if(!findUser){
            return res.status(400).send({ success, "error": "please try with correct credentials" })
        }

        const userPass = req.body.password
       const comparePass =  await bcrypt.compare(userPass, findUser.password);
       if(comparePass){
           success = true
           return res.status(200).send({success})
       }
       else{
        return res.status(400).send({ success, "error": "please try with correct credentials" })
       }
    }

    catch(error) {
        console.log(error, "internal server error found")
    }
    })


module.exports = router