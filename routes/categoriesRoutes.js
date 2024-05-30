const Controller = require("../controllers/controller");
// const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

// router.use(authentication);
router.post("/", Controller.addCategory);

router.get("/", Controller.getCategories);

router.put("/:id", Controller.editCategory);

router.delete("/:id", Controller.deleteCategory);
router.use(errorHandler);

module.exports = router;
