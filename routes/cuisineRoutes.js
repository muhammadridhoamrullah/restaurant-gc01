const Controller = require("../controllers/controller");

// const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const ControllerCuisine = require("../controllers/controllerCuisine");

router.post("/", ControllerCuisine.addCuisine);
router.get("/", ControllerCuisine.getCuisines);

router.get("/:id", ControllerCuisine.getCuisineById);

router.put("/:id", authorization, ControllerCuisine.editCuisine);

router.delete("/:id", authorization, ControllerCuisine.deleteCuisine);

router.use(errorHandler);

module.exports = router;
