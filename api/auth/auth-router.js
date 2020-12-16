const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const router = express.Router()

const checkPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json('Bad payload');
    } else {
        next();
    };
};

const checkUsernameUnique = async (req, res, next) => {
  try {
      const rows = await User.getBy({ username: req.body.username });
      if (!rows.length) {
          next();
      } else {
          res.status(401).json('Username taken');
      };
  } catch (err) {
      res.status(500).json('Failure in checking username availability')
  }
};

const checkUsernameExists = async (req, res, next) => {
    try {
        const rows = await User.getBy({ username: req.body.username })
        if (rows.length) {
            req.userData = rows[0]
            next()
        } else {
            res.status(401).json('There is no user by this username')
        }
    } catch (err) {
        res.status(500).json('Error checking if username exists')
    }
};

router.post('/register', checkPayload, checkUsernameUnique, async (req, res) => {
    console.log('registering')
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = await User.insert({ username: req.body.username, password: hash})
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
    try {
        console.log('logging in');
        const verifies = bcrypt.compareSync(req.body.password, req.userData.password)
        if (verifies) {
            console.log('Save a session for this user');
            req.session.user = req.userData
            res.json(`Welcome back, ${req.userData.username}`)
        } else {
            res.status(401).json('Bad credentials')
        }
    } catch (err) {
        res.status(500).json('Error loggin in. Login not successful')
    }
});

module.exports = router