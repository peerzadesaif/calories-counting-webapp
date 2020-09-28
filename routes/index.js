const fs = require("fs");
const path = require("path");

const UsersRoute = require("./UserRoutes");

const initRoute = (app) => {
  app.use(`/api/`, UsersRoute);
};
export default initRoute;
