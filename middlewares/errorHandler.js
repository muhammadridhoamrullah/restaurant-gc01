function errorHandler(error, req, res, next) {
  if (error.name === "UNAUTHORIZED" || error.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Please login first!",
    });
  } else if (error.name === "FORBIDDEN") {
    res.status(403).json({
      message: "You have no access!",
    });
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeConstraintUniqueError"
  ) {
    let errors = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ errors });
  } else {
    res.status(500).json;
  }
}

module.exports = errorHandler;
