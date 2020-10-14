const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");

import UsersController from "../app/controllers/UsersController";
import MealsController from "../app/controllers/MealsController";

router.route("/user/login").post(UsersController.Login);

router.route("/user/register").post(UsersController.Register);

router.route("/user/meals")
    .get(adminMiddleware.authenticate, MealsController.GetAllMeals)
    .post(adminMiddleware.authenticate, MealsController.AddMeal);

router.route("/user/meals/:_id")
    .get(adminMiddleware.authenticate, MealsController.GetSingleMeal)
    .put(adminMiddleware.authenticate, MealsController.UpdateMeal)
    .delete(adminMiddleware.authenticate, MealsController.DeleteMeal);

router.route("/password/reset").post(UsersController.ResetPassword);

router.route("/password/reset/:token").get(UsersController.VerifyUserResetPassword);


module.exports = router;
