const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

router.route('/')
    .post(usersController.createNewUser)
    .get(usersController.getAllUsers)
    // .put(assetController.updateAsset)
    // .delete(assetController.deleteAsset);

// router.route('/:id')
    // .get(assetController.getAsset);

module.exports = router;