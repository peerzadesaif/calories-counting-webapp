# calories-counting-webapp

> A simple calories counting project, Created with carbon react components, react hooks and **Node.js** in backend.


## Build Setup

Getting Started
---------------

The easiest way to get started is to clone the repository:

``` bash
# Get the latest snapshot
git clone https://github.com/saifpirjade/calories-counting-webapp.git myproject

# Change directory
cd myproject

# Install NPM dependencies for both
npm run deps:install

# Run individually Install NPM dependencies
npm install and cd client npm install

# Then simply serve your backend and Frontend concurrently at backend: localhost:9001, frontend: localhost:3001 (or auto port)
npm run dev

# Then simply serve your frontend at localhost:3001 (or auto port)
npm run client

# Then simply serve your only backend at localhost:9001
npm run server

# Use PM2 to run the server on production
npm run prod:server

```
Features
--------
- **Middleware to verify client Authentication token**
- MVC Project Structure
- Winston logger service to handle logs based on conditions
- Error service to handle all type of error
- Process error handled with required possibilities
- Security Service to generate JWT, verify JWT, decode JWT, encrypt token, decrypt token, and etc
- Response Service to handle all types of responses and status code using the same.
- Used MongoDB database with mongoose


Notes
---------------
- Please install latest NodeJs stable version in your system.
- If you are running on cloud server, Please change the base URL or IP in your client API request.
- If you don't want to run concurrently, you can individually too. Please Install NPM dependencies before

Folder Structure
============================
```
.
Frontend Start
├── client
│   ├── etc
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src
│       ├── apiServices
│       │   ├── Api.js
│       │   └── UserServices.js
│       ├── components
│       │   ├── common
│       │   │   └── LeftComponent.js
│       │   ├── layouts
│       │   │   ├── DashBoard.js
│       │   │   ├── ForgotPasswordPage.js
│       │   │   ├── LoginPage.js
│       │   │   └── RegisterPage.js
│       │   ├── views
│       │   │   ├── AddMeals.js
│       │   │   ├── EditMeals.js
│       │   │   └── MealsList.js
│       │   ├── AppRouter.js
│       │   └── PrivateRoute.js
│       ├── store
│       │   ├── actions
│       │   │   ├── alertActions.js
│       │   │   └── userActions.js
│       │   ├── reducers
│       │   │   ├── alertReducers.js
│       │   │   ├── UsersReducers.js
│       │   │   └── index.js
│       │   ├── history.js
│       │   ├── store.js
│       │   └── Types.js
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── carbonIndex.css
│       ├── index.js
│       └── index.js

Backend Start
├── app
│   ├── commons.js
│   │   └── collection.js
│   ├── controllers
│   │   ├── MealsController.js
│   │   └── UsersController.js
│   ├── enum
│   │   ├── apiVersions.js
│   │   ├── appDetails.js
│   │   ├── environmentType.js
│   │   ├── genderType.js
│   │   ├── logType.js
│   │   ├── roleType.js
│   │   ├── statusTypes.js
│   │   └── uploadType.js
│   ├── helpers
│   │   ├── constant.js
│   │   └── responseHelper.js
│   ├── securityService
│   │   └── securityClient.js
│   └── services
│       ├── ErrorService.js
│       ├── LoggingService.js
│       └── ResponseService.js
├── config
│   └── index.js
├── middleware
│   └── adminMiddleware.js
├── models
│   ├── plugins.js
│   │   └──pagedFind.js
│   ├── Meal.js
│   └── User.js
├── public
│   ├── assets
│   ├── logos
│   ├── uploads
│   └── xlsx
├── routes
│   ├── UserRoutes.js
│   └── index.js
├── mongoClient.js
├── terminate.js
└── server.js
```

### Description
---------------
I have used React in frontend with a carbon design system and components to make UI. and for backend, I have Used NodeJs with very similar folder Structure as everyone follows but I have created my own custom services to handled requests and logging, etc.
So basically, I have started from Server files and after that, I have integrated the routes and controllers as we needed and then I have created the branches to handle the various operation as per feature requirements.So main base files and folders are Routes, Controllers, and middleware, and other helpers and services as per your need.

React Design Link: https://react.carbondesignsystem.com