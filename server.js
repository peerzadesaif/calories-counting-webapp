const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");


// USE CUSTOM MODULES
import * as constant from "./app/helpers/constant";
const port = constant.config.port || 9001;
import terminate from "./terminate";

const app = express();
const server = http.createServer(app);

// Connect MongoDB Database
require('./mongoClient').default(app);

app.set("port", process.env.PORT || port);

app.use(express.static(path.join(__dirname, "public"), { maxage: "7d" }));
// view engine
app.set('view engine', 'ejs');
app.use(cors());
app.set('trust proxy', 1); // trust first proxy
app.use(session({ secret: 'Secret_LOL', resave: false, saveUninitialized: true, cookie: { secure: true, maxAge: 60000 } }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser('Secret_LOL'));

app.use(function (req, res, next) {
    req.app.set('title', 'working')
    console.log('object :>> ');
    next()
});

// ENABLE OR INITIATE ROUTES
require('./routes').default(app);

// SIMPLE TESTING
app.get("/", function (req, res) {
    res.json({ status: false, message: 'Testing /' })
});

app.get("*", function (req, res) {
    res.json({ status: false, message: 'Testing' })
});

/**
 * unhandledRejection: Emitted when a Promises rejected and no handler is attached to the promise
 * uncaughtException: Emitted when a Javascript error isn't properly handled
 * SIGTERM: A process monitor will send a SIGTERM signal tos successfully terminate a process
 * SIGINT: It's emitted when the process is interrupted (^C)
 */
const exitHandler = terminate(server, { coredump: false, timeout: 500 });
process.on('beforeExit', code => { console.log("SERVER_PROCESS_ERROR", `Process will exit with code ${String(code)}`); setTimeout(() => process.exit(code), 100) });
process.on("unhandledRejection", exitHandler(1, 'Unhandled Promise'))
process.on("uncaughtException", exitHandler(1, 'Unexcepted Error'))
process.on("SIGTERM", exitHandler(0, 'SIGTERM'))
process.on("SIGINT", exitHandler(0, 'USIGINT'))

// YOUR SERVER IS LISTENING HERE
/**
 * ENABLE IF YOU NEED TO RUN SERVER WITH CLUSTER
 */
server.listen(app.get("port") || 8001, constant.config.host)

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    };
};
const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe: ' + addr : 'port: ' + addr.port;
    console.log(`Server Listening on ${bind} process id: ${process.pid}`);
};
server.on('error', onError);
server.on('listening', onListening);
