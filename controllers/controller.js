const { where } = require('sequelize')
const {Cuisine, User, Category} = require('../models/')

class Controller {

    static async addCuisine(req, res) {
        try {
            const { name, description, price, imgUrl, categoryId, authorId } = req.body
            const data = await Cuisine.create({name, description, price, imgUrl, categoryId, authorId})
            res.status(201).json(data)
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let errors = error.errors.map(el => {
                    return el.message
                })
                res.status(400).json({errors})
            } else {
                res.status(500).json({
                    message: "Internal Server Error"
                })
            }
        }
    }

    static async getCuisines(req, res) {
        try {
            const cuisines = await Cuisine.findAll()
            res.json(cuisines)
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    static async getCuisineById(req, res) {
        try {
            let { id } = req.params
            let data = await Cuisine.findByPk(id)
            res.json(data)
        } catch (error) {
            res.status(404).json({
                message : "Error not found!"
            })
        }
    }

    static async editCuisine(req, res) {
        try {
            let { id } = req.params
            const { name, description, price, imgUrl, categoryId, authorId } = req.body

            let findData = await Cuisine.findByPk(id) 
            if(!findData) {
                throw { name: "DATANOTFOUND"}
            }
            
            let data = await Cuisine.update({name, description, price, imgUrl, categoryId, authorId}, {
                where: {
                    id
                }
            }
            )

            res.status(200).json(data)

        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let errors = error.errors.map(el => {
                    return el.message
                })
                res.status(400).json({errors})
            } else if (error.name === "DATANOTFOUND") {
                res.status(404).json({
                    message: "Error not found"
                })
            } else {
                res.status(500).json({
                    message: "Internal Server Error"
                })
            }
        }
    }

    static async deleteCuisine(req, res) {
        try {
            let { id } = req.params
            let dataCuisine = await Cuisine.findByPk(id)
            if (!dataCuisine) {
                throw { name : "DATANOTFOUND" }
            }
            let dataDeleted = await Cuisine.destroy({where: id})
            res.status(200).json({
                message: `${dataDeleted.name} success to delete`
            })
        } catch (error) {
            if (error.name === "DATANOTFOUND") {
                res.status(404).json({
                    message: "Error not found"
                })
            } else {
                res.status(500).json({
                    message: "Internal Server Error"
                })
            }
        }
    }

}

module.exports = Controller