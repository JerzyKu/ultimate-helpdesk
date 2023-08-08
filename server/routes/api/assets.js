const express = require('express');
const router = express.Router();
const assetController = require('../../controllers/assetController');

router.route('/')
    .post(assetController.createNewAsset)
    .get(assetController.getAllAssets)
    .put(assetController.updateAsset)

router.route('/:id')
    .get(assetController.getAsset)
    .delete (assetController.deleteAsset)

module.exports = router;