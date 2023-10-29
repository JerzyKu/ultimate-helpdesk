const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const verifyJWT = require("../../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .post(usersController.createNewUser)
  .get(usersController.getAllUsers)
  .put(usersController.updateUser);
// .delete(assetController.deleteAsset);

router.route("/:id")
    .delete(usersController.deleteUser);
// .get(assetController.getAsset);

module.exports = router;
