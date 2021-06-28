const express = require ('express');
const router = express.Router();
const {updateGame} = require('../Controllers/Userauth');

router.post('/answer', updateGame);

console.log(updateGame);


module.exports = router;