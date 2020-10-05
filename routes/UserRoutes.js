const express = require("express");
const router = express.Router();
import UsersController from "../app/controllers/UsersController";
import MealsController from "../app/controllers/MealsController";

router.route("/user/login").post(UsersController.Login);

router.route("/user/register").post(UsersController.Register);

router.route("/user/meals")
    .get(MealsController.GetAllMeals)
    .post(MealsController.AddMeal);

router.route("/user/meals/:_id")
    .get(MealsController.GetSingleMeal)
    .put(MealsController.UpdateMeal)
    .delete(MealsController.DeleteMeal);

router.route("/password/reset").post(UsersController.ResetPassword);

router.route("/password/reset/:token").get(UsersController.VerifyUserResetPassword);


module.exports = router;
