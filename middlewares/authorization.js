const authorization = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      throw { name: "UNAUTHORIZED" };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = authorization;
