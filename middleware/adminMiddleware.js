import * as constant from "../app/helpers/constant";
import * as collection from "../app/common/collection";

import statusTypes from "../app/enum/statusTypes";

import ResponseService from "../app/services/ResponseService";
import SecurityClient from "../app/securityService/securityClient";


// Create a service to customer check

export const authenticate = async (req, res, next) => {
	const { app, headers } = req;
	if (!headers.authorization) return res.status(statusTypes.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	// verify the token first
	const verify = SecurityClient.jwtVerify(headers.authorization);
	if (!verify) return res.status(statusTypes.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	const jwtDecode = SecurityClient.jwtDecode(headers.authorization);
	if (!jwtDecode) return res.status(statusTypes.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	const existingAdmin = false;// We will Call Service to check client admin or not with a DB
	// if (!existingAdmin || existingAdmin.error || !existingAdmin.value) return res.status(statusTypes.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	const decrypt = SecurityClient.decrypt(jwtDecode.encryptToken);
	const user = JSON.parse(decrypt)

	// eslint-disable-next-line require-atomic-updates
	req.user = user
	req.meta = { ...req.meta, clientId: user._id, ...user };
	return next();
};