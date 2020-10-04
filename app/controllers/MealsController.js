

// SCHEMA 
const User = require('../../models/User');

import ResponseService from "../services/ResponseService";
import LoggingService from "../services/LoggingService";
import securityClient from "../securityService/securityClient";

import statusTypes from "../enum/statusTypes";
import * as constant from "../helpers/constant";


module.exports.GetAllMeals = async (req, res) => {
  return res.json({ status: true, messages: 'GetAllMeals' });
};
module.exports.AddMeal = async (req, res) => {
  return res.json({ status: true, messages: 'AddMeal' });
};
module.exports.GetSingleMeal = async (req, res) => {
  return res.json({ status: true, messages: 'GetSingleMeal' });
};
module.exports.UpdateMeal = async (req, res) => {
  return res.json({ status: true, messages: 'UpdateMeal' });
};


