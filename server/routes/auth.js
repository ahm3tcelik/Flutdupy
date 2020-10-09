const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../modules/auth');

router.post('/login', (req, res) => {
    if(!req.body.email || !req.body.password)
        return res.status(400).send('Eksik Parametre');
    
    const user = auth.login(req.body.email, req.body.password)[0];

    if(user) {
        
        //Create a token
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token)
    }
    else return res.status(400).send('E-Mail or password is wrong.');
});

module.exports = router;