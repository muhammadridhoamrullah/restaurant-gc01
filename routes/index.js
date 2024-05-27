const Controller = require("../controllers/controller");
const router = require("express").Router();

router.post("/cuisines", Controller.addCuisine);
router.get("/cuisines", Controller.getCuisines);

// --------------PUB------------------
router.get("/cuisines/pub", Controller.getCuisinesPub);
router.get("/cuisines/:id/pub", Controller.getCuisinesPubById);
// --------------PUB------------------

router.get("/cuisines/:id", Controller.getCuisineById);

router.put("/cuisines/:id", Controller.editCuisine);

router.delete("/cuisines/:id", Controller.deleteCuisine);

// --------------CATEGORY---------------

router.post("/categories", Controller.addCategory);

router.get("/categories", Controller.getCategories);

router.put("/categories/:id", Controller.editCategory);

router.delete("/categories/:id", Controller.deleteCategory);

module.exports = router;
