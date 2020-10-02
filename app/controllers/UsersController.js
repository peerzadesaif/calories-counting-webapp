

// SCHEMA 
const User = require('../../models/User');

import ResponseService from "../services/ResponseService";
import LoggingService from "../services/LoggingService";
import securityClient from "../securityService/securityClient";

import statusTypes from "../enum/statusTypes";
import * as constant from "../helpers/constant";

module.exports.Login = async (req, res) => {
  try {
    let reqbody = req.body;
    console.log('reqbody', reqbody)
    if (!req.body.email || !req.body.password) return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.FORBIDDEN, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}));
    const presentUser = await User.findOne({ email: req.body.email });
    if (presentUser) {
      var isMatch = await presentUser.comparePassword(req.body.password);
      if (isMatch) {
        const setEncryptedData = securityClient.encrypt(JSON.stringify(presentUser));
        presentUser.lastLoginAt = Date.now();
        presentUser.lastLoginIp = req.connection['remoteAddress'] || req.headers["x-forwarded-for"] || req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.ip || "";
        const _presentUser = await presentUser.save();

        const token = securityClient.jwtEncode({ encryptToken: setEncryptedData });
        return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.LOGIN_SUCCESS, null, { token, user: _presentUser }))
      } else {
        return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.NOT_IMPLEMENTED_UNAUTHORIZED, constant.CUSTOM_RESPONSE_MESSAGES.PASSWORD_INVALID));
      }
    } else {
      return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.FORBIDDEN, constant.CUSTOM_RESPONSE_MESSAGES.USER_NOT_FOUND, null, {}));
    }
  } catch (error) {
    console.error('Register Error: ', error);
    return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};

module.exports.Register = async (req, res) => {
  try {
    let reqbody = req.body;
    console.log('reqbody', reqbody)
    if (!req.body.email || !req.body.password) return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.FORBIDDEN, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}));
    //Create new user
    const presentUser = await User.findOne({ email: req.body.email });
    if (presentUser) return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.FORBIDDENs, constant.CUSTOM_RESPONSE_MESSAGES.USER_EXISTS, null, {}));
    let userModel = new User();
    userModel.firstName = reqbody.first_name || '';
    userModel.lastName = reqbody.last_name || '';
    userModel.email = reqbody.email || '';
    userModel.password = reqbody.password || '';
    userModel.company = reqbody.company || '';
    userModel.role = reqbody.role || '';
    userModel.phoneNumber = reqbody.phone_number || '';
    const user = await userModel.save();
    return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, "User Successfully Created", null, user));
  } catch (error) {
    console.error('Register Error: ', error);
    return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};
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
module.exports.ResetPassword = async (req, res) => {
  try {
    let reqbody = req.body;
    console.log('reqbody', reqbody)
    if (!req.body.email) return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.FORBIDDEN, constant.CUSTOM_RESPONSE_MESSAGES.EMPTY_PARAMS, null, {}));
    const presentUser = await User.findOne({ email: req.body.email });
    if (presentUser) {
      const setEncryptedData = securityClient.encrypt(JSON.stringify({ email: req.body.email, id: presentUser._id }));
      // console.log('setEncryptedData', setEncryptedData)
      // CREATE THE LINK AND SEND A MAIL TO THE REQUEST USER
      // let link= `${host}/password/reset/${setEncryptedData}`;
      return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.LINK_SENT_SUCCESS, null, { resetLink: setEncryptedData }))
    } else {
      return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.FORBIDDEN, constant.CUSTOM_RESPONSE_MESSAGES.USER_NOT_FOUND, null, {}));
    }
  } catch (error) {
    console.error('Register Error: ', error);
    return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.CODE_422, null, null, error));
  }
};

module.exports.VerifyUserResetPassword = async (req, res) => {
  return res.json({ status: true, messages: 'VerifyUserResetPassword' });
};

