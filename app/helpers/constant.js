// enums
import appDetails from "../enum/appDetails";

const configServer = require("../../config");
export const config = configServer;

export const APP_NAME = appDetails.APPNAME;

export const MESSAGE_NOT_ALLOWED = "Not allowed to access customer services";
export const MESSAGE_AUTH_ERROR = "Unauthorized or invalid OTP.";
export const MESSAGE_NOT_FOUND_ERROR = "Not found. Please try after sometime.";
export const MESSAGE_DB_ERROR = "Something went wrong while processing data.";
export const MESSAGE_APP_ERROR = "Something went wrong while processing data.";

// Response Messages
export const RESPONSE_MESSAGES = {
    CODE_400: "Auth Token is required. Please provide a valid auth token along with request.",
    CODE_401: "You need to login to view this",
    CODE_403: "You are forbidden from seeing this",
    CODE_404: "The resource referenced by request does not exists.",
    CODE_405: "Requested method is not valid",
    CODE_408: "Request getting too much time. please try after some time",
    CODE_500: "Something went wrong on server. Please contact server admin.",
    CODE_501: "We will patch no such thing",
    CODE_503: "Requested service is unavailable for this time",
    CODE_200: "Success",
    CODE_201: "Created",
    CODE_422: "Something went wrong, Database error",
};



export const CUSTOM_RESPONSE_MESSAGES = {
    USER_RES: "Custom Response message will come here",
    EMPTY_PARAMS: "Please provide the required params with the request",
    USER_EXISTS: "User already exists, please login",
    USER_NOT_FOUND: "User not found with the provided information",
    TOKEN_INVALID: "Invalid token",
    GET_SUCCESS: "Data retrieved successfully",
    EDIT_SUCCESS: "Data updated successfully",
    DELETE_SUCCESS: "Data deleted successfully",
    ADDED_SUCCESS: "Data inserted successfully",
    DATA_NOT_FOUND: "No data found",
    REGISTER_SUCCESS: "Registration successful",
    LOGIN_SUCCESS: "Login successful",
    TRANSACTION_ERROR: "Error during transaction",
    TRANSACTION_SUCCESS: "Transaction completed successfully",
    TRANSACTION_CANCEL_SUCCESS: "Transaction cancelled successfully",
    PASSWORD_INVALID: "Invalid password",

};


export const VALIDATION_MESSAGES = {
    EMPTY_MESSAGE: "Please enter a message",
    EMPTY_EMAIL: "Please enter a email",
    EMAIL: "Please enter a valid email",
    EMPTY_NUMBER: "Please enter a number",
    NUMBER: "Please enter a valid number",
    NUMBER_INVALID: "Please enter a number with 10 digits",
    NUMBER_NAN: "Please enter only numeric characters",
    EMPTY_NAME: "Please enter a name",
    EMPTY_ORG_NAME: "Please enter an organization name",
    EMPTY_FILES: "Please add a file",
    NAME: "Please enter a valid name",

    EMPTY_MEAL: "Please enter a meal",
    EMPTY_MEAL_CALORIES: "Please enter a calories",
    EMPTY_MEAL_DATE: "Please select a date",



};


