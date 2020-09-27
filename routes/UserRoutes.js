const express = require("express");
const router = express.Router();
import UsersController from "../app/controllers/UsersController";

router.route("/user/login").post(UsersController.Login);

router.route("/user/register").post(UsersController.Register);

router.route("/user/meals")
    .get(UsersController.GetAllMeals)
    .post(UsersController.AddMeal);

router.route("/user/meals/:id")
    .get(UsersController.GetSingleMeal)
    .put(UsersController.UpdateMeal);

router.route("/password/reset").post(UsersController.ResetPassword);

router.route("/password/reset/:token").get(UsersController.VerifyUserResetPassword);


module.exports = router;
