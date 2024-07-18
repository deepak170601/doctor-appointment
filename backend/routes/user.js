const router = require('express').Router();
let User = require('../models/user');

router.route('/').post((req, res) => {
  const name = req.body.name;
  const place = req.body.place;

  const newUser = new User({ name, place });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
