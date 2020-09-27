const express = require("express");
const router = express.Router();
import UsersController from "../app/controllers/UsersController";

router.route("/user/testing").get(UsersController.Testing);


module.exports = router;
