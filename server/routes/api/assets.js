const express = require('express');
const router = express.Router();
const assetController = require('../../controllers/assetController');
const verifyJWT = require('../../middleware/verifyJWT');

router.use(verifyJWT)

router.route('/')
    .post(assetController.createNewAsset)
    .get(assetController.getAllAssets)
    .patch(assetController.updateAsset)

router.route('/:id')
    .get(assetController.getAsset)
    .delete (assetController.deleteAsset)

module.exports = router;