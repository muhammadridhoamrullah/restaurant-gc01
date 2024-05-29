const Controller = require("../controllers/controller");
const router = require("express").Router();

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const errorHandler = require("../middlewares/errorHandler");

const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });

// -------------LOGIN--------------

router.post("/login", Controller.login);

// --------------PUB------------------
router.get("/cuisines/pub", Controller.getCuisinesPub);
router.get("/cuisines/:id/pub", Controller.getCuisinesPubById);
// --------------PUB------------------

router.use(authentication);

router.post("/cuisines", Controller.addCuisine);
router.get("/cuisines", Controller.getCuisines);

router.get("/cuisines/:id", Controller.getCuisineById);

router.put("/cuisines/:id", authorization, Controller.editCuisine);

router.delete("/cuisines/:id", authorization, Controller.deleteCuisine);

router.post("/add-user", authorizationAdmin, Controller.register);

// --------------CATEGORY---------------

router.post("/categories", Controller.addCategory);

router.get("/categories", Controller.getCategories);

router.put("/categories/:id", Controller.editCategory);

router.delete("/categories/:id", Controller.deleteCategory);

router.patch(
  "/cuisineImage/:id",
  upload.single("picture"),
  Controller.uploadImage
);

router.use(errorHandler);

module.exports = router;
