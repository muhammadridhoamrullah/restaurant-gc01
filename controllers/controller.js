const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { Cuisine, User, Category } = require("../models/");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Controller {
  static async addCuisine(req, res, next) {
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
      next(error);
    }
  }

  static async getCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({
        include: {
          model: User,
          attributes: { exclude: "password" },
        },
      });
      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "DATANOTFOUND" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editCuisine(req, res, next) {
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
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
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
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      let { name } = req.body;
      let addCat = await Category.create({ name });
      res.status(201).json(addCat);
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      let data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
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
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
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
      next(error);
    }
  }

  static async getCuisinesPub(req, res, next) {
    try {
      let data = await Cuisine.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisinesPubById(req, res, next) {
    try {
      let { id } = req.params;
      let dataCuisine = await Cuisine.findByPk(id);
      if (!dataCuisine) {
        throw { name: "DATANOTFOUND" };
      }

      res.status(200).json(dataCuisine);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password, phoneNumber, address, username } = req.body;
      let regisUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
        username,
      });

      let tampilUser = await User.findOne(
        {
          attributes: { exclude: "password" },
        },
        {
          where: {
            email,
          },
        }
      );

      //   res.send("jalan bosku");
      res.status(201).json(tampilUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
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
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const encode = req.file.buffer.toString("base64");

      const base64Data = `data:${req.file.mimetype};base64,${encode}`;

      const upload = await cloudinary.uploader.upload(base64Data);

      await Cuisine.update(
        {
          imgUrl: upload.secure_url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Upload berhasil!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
