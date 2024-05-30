const Controller = require("../controllers/controller");
// const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();
const authorization = require("../middlewares/authorization");

router.post("/", Controller.addCuisine);
router.get("/", Controller.getCuisines);

router.get("/:id", Controller.getCuisineById);

router.put("/:id", authorization, Controller.editCuisine);

router.delete("/:id", authorization, Controller.deleteCuisine);

router.use(errorHandler);

module.exports = router;
