const express = require('express');
const fs = require('fs');
const allUserControllers = require('../../Controllers/allUser.Controller');

const router = express.Router();
router.route('/')
    .get(allUserControllers.allUsers)
    .post(allUserControllers.addUser)
router.route('/:random')
    .get(allUserControllers.randomUser)
    .patch(allUserControllers.updateUser)
    .delete(allUserControllers.deleteUser)

module.exports = router;