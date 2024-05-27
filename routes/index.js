const Controller = require("../controllers/controller");
const router = require('express').Router();

router.post('/cuisines', Controller.addCuisine)
router.get('/cuisines', Controller.getCuisines)

router.get('/cuisines/:id', Controller.getCuisineById)

router.put('/cuisines/:id', Controller.editCuisine)

router.delete('/cuisine/:id', Controller.deleteCuisine)

module.exports = router