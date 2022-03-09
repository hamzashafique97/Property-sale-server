const express = require("express");
const userController = require("../controllers/userController");
const plotsController = require("../controllers/plotController");
const clientsController = require("../controllers/clientController");

const router = express.Router();

// User API's
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.get("/getusers", userController.getUser);
router.get("/getuser/:id", userController.getUserById);
router.put("/updateuser", userController.updateUser);

// Plots API's
router.post("/createplot", plotsController.create);
router.get("/getplots/:page", plotsController.getPlots);
router.get("/getplot/:id", plotsController.getPlot);
router.put("/updateplot", plotsController.updatePlot);

// Clients API's
router.post("/createclient", clientsController.create);
router.get("/getclients", clientsController.getClients);
router.get("/getclient/:id", clientsController.getClient);
router.put("/updateclient", clientsController.updateClient);


module.exports = router;