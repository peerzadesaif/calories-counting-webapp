//require mongoose module
var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
import * as constant from "./app/helpers/constant";

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
export default (app) => {

    mongoose.connect(constant.config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to ", constant.config.mongodb.uri));
    });

    mongoose.connection.on('open', function () {
        console.log(connected('MongoDB connection opened!'));
    });

    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}