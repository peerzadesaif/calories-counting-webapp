

// SCHEMA 
const Meal = require('../../models/Meal');

import ResponseService from "../services/ResponseService";
import LoggingService from "../services/LoggingService";
import securityClient from "../securityService/securityClient";

import statusTypes from "../enum/statusTypes";
import * as constant from "../helpers/constant";


module.exports.GetAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.GET_SUCCESS, null, meals))
  } catch (error) {
    console.error('GetAllMeals Error: ', error);
    LoggingService.consoleLog("DB_PROCESS_ERROR", "GetAllMeals Database Error: ", error);
    return res.status(statusTypes.CODE_422).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};

module.exports.AddMeal = async (req, res) => {
  try {
    let reqbody = req.body
    if (!req.body) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else if (!req.body['meal_text']) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.VALIDATION_MESSAGES.EMPTY_MEAL, null, {}))
    } else if (!req.body['calories']) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.VALIDATION_MESSAGES.EMPTY_MEAL_CALORIES, null, {}))
    } else if (!req.body['date']) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.VALIDATION_MESSAGES.EMPTY_MEAL_DATE, null, {}))
    } else {
      let mealModel = new Meal();
      mealModel.mealText = reqbody.meal_text;
      mealModel.calories = reqbody.calories;
      mealModel.date = reqbody.date;
      const meal = await mealModel.save();

      return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.ADDED_SUCCESS, null, meal))
    }
  } catch (error) {
    console.error('AddMeal Error: ', error);
    LoggingService.consoleLog("DB_PROCESS_ERROR", "AddMeal Database Error: ", error);
    return res.status(statusTypes.CODE_422).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};

module.exports.GetSingleMeal = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else if (!req.params._id) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else {
      const meals = await Meal.findOne({ _id: req.params._id });
      return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.GET_SUCCESS, null, meals))
    }
  } catch (error) {
    console.error('GetSingleMeal Error: ', error);
    LoggingService.consoleLog("DB_PROCESS_ERROR", "GetSingleMeal Database Error: ", error);
    return res.status(statusTypes.CODE_422).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};

module.exports.UpdateMeal = async (req, res) => {
  try {
    let reqbody = req.body;
    if (!req.params) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else if (!req.params._id) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else if (req.body.mealText) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else {
      const meals = await Meal.findOne({ _id: req.params._id });
      if (!meals) {
        return res.status(statusTypes.FORBIDDEN).json(ResponseService.sendResponse(statusTypes.FORBIDDEN, constant.CUSTOM_RESPONSE_MESSAGES.DATA_NOT_FOUND, null, {}));
      } else {
        meals.mealText = reqbody.meal_text;
        meals.calories = reqbody.calories;
        meals.date = reqbody.date;
        const _meals = await meals.save();

        return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.EDIT_SUCCESS, null, _meals))
      }
    }
  } catch (error) {
    console.error('UpdateMeal Error: ', error);
    LoggingService.consoleLog("DB_PROCESS_ERROR", "UpdateMeal Database Error: ", error);
    return res.status(statusTypes.CODE_422).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};



module.exports.DeleteMeal = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else if (!req.params._id) {
      return res.status(statusTypes.BAD_REQUEST).json(ResponseService.sendResponse(statusTypes.BAD_REQUEST, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}))
    } else {
      const meals = await Meal.findOneAndRemove({ _id: req.params._id });
      return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.DELETE_SUCCESS, null, meals))
    }
  } catch (error) {
    console.error('GetSingleMeal Error: ', error);
    LoggingService.consoleLog("DB_PROCESS_ERROR", "GetSingleMeal Database Error: ", error);
    return res.status(statusTypes.CODE_422).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};

