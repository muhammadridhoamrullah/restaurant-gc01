const { Op } = require("sequelize");
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
  static async getCuisinesPub(req, res, next) {
    try {
      let { filter, search, sort, page } = req.query;
      let limit = 5;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = page.size;
        }
        if (page.number) {
          pageNumber = page.number;
        }
      }

      let option = {
        where: {},
        limit,
        offset: limit * (pageNumber - 1),
      };
      if (filter) {
        option.where.categoryId = filter;
      }

      if (search) {
        option.where.name = { [Op.iLike]: `%${search}%` };
      }

      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const sortBy = ordering === "DESC" ? sort.slice(1) : sort;
        option.order = [[sortBy, ordering]];
      }

      let data = await Cuisine.findAll(option);
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

      let tampilUser = await User.findOne({
        attributes: { exclude: "password" },
        where: {
          email,
        },
      });

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
        throw { name: "UNAUTHORIZED" };
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
