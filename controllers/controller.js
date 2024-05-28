const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { Cuisine, User, Category } = require("../models/");

class Controller {
  static async addCuisine(req, res) {
    try {
      const { name, description, price, imgUrl, categoryId, authorId } =
        req.body;
      const data = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId,
      });
      res.status(201).json(data);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => {
          return el.message;
        });
        res.status(400).json({ errors });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getCuisines(req, res) {
    try {
      const cuisines = await Cuisine.findAll({
        include: {
          model: User,
          attributes: { exclude: "password" },
        },
      });
      res.status(200).json(cuisines);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async getCuisineById(req, res) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "DATANOTFOUND" };
      }
      res.status(200).json(data);
    } catch (error) {
      if (error.name === "DATANOTFOUND") {
        res.status(404).json({
          message: "Error not found!",
        });
      }
    }
  }

  static async editCuisine(req, res) {
    try {
      let { id } = req.params;
      const { name, description, price, imgUrl, categoryId, authorId } =
        req.body;

      let findData = await Cuisine.findByPk(id);
      if (!findData) {
        throw { name: "DATANOTFOUND" };
      }

      let data = await Cuisine.update(
        { name, description, price, imgUrl, categoryId, authorId },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json(data);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => {
          return el.message;
        });
        res.status(400).json({ errors });
      } else if (error.name === "DATANOTFOUND") {
        res.status(404).json({
          message: "Error not found",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async deleteCuisine(req, res) {
    try {
      let { id } = req.params;
      let dataCuisine = await Cuisine.findByPk(id);
      if (!dataCuisine) {
        throw { name: "DATANOTFOUND" };
      }
      await Cuisine.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `${dataCuisine.name} success to delete`,
      });
    } catch (error) {
      if (error.name === "DATANOTFOUND") {
        res.status(404).json({
          message: "Error not found",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async addCategory(req, res) {
    try {
      let { name } = req.body;
      let addCat = await Category.create({ name });
      res.status(201).json(addCat);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => {
          return el.message;
        });
        res.status(400).json({ errors });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getCategories(req, res) {
    try {
      let data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async editCategory(req, res) {
    try {
      let { id } = req.params;
      let { name } = req.body;
      let dataCat = await Category.findByPk(id);
      if (!dataCat) {
        throw { name: "DATANOTFOUND" };
      }

      let updateCat = await Category.update(
        { name },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json(updateCat);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => {
          return el.message;
        });
        res.status(400).json({ errors });
      } else if (error.name === "DATANOTFOUND") {
        res.status(404).json({
          message: "Error not found",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async deleteCategory(req, res) {
    try {
      let { id } = req.params;
      let dataCat = await Category.findByPk(id);
      if (!dataCat) {
        throw { name: "DATANOTFOUND" };
      }

      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `${dataCat.name} success to delete`,
      });
    } catch (error) {
      if (error.name === "DATANOTFOUND") {
        res.status(404).json({
          message: "Error not found",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getCuisinesPub(req, res) {
    try {
      let data = await Cuisine.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async getCuisinesPubById(req, res) {
    try {
      let { id } = req.params;
      let dataCuisine = await Cuisine.findByPk(id);
      if (!dataCuisine) {
        throw { name: "DATANOTFOUND" };
      }

      res.status(200).json(dataCuisine);
    } catch (error) {
      if (error.name === "DATANOTFOUND") {
        res.status(404).json({
          message: "Error not found",
        });
      } else {
      }
    }
  }

  static async register(req, res) {
    try {
      let { email, password, phoneNumber, address, username } = req.body;
      let regisUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
        username,
      });

      //   res.send("jalan bosku");
      res.status(201).json({
        id: regisUser.id,
        email: regisUser.email,
      });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        let errors = error.errors.map((el) => {
          return el.message;
        });
        res.status(400).json({ errors });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async login(req, res) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EMAIL_PASSWORD_REQUIRED" };
      }

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "USERNOTFOUND" };
      }

      const comparePass = comparePassword(password, user.password);
      if (!comparePass) {
        throw { name: "UNATHORIZED" };
      }

      const token = signToken({
        id: user.id,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
      //   res.status(500).json({
      //     message: "Internal Server Error",
      //   });
    }
  }
}

module.exports = Controller;
