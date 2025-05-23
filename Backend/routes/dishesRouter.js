const express = require("express");
const { getDishes } = require("../controllers/dishesController");

const dishRouter = express.Router();

dishRouter.get("/", getDishes);

module.exports = dishRouter;
