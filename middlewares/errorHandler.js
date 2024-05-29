function errorHandler(error, req, res, next) {
  // console.log(error, " <<<< error terbaru");
  if (error.name === "UNAUTHORIZED" || error.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "EMAIL OR PASSWORD INVALID",
    });
  } else if (error.name === "FORBIDDEN") {
    res.status(403).json({
      message: "You have no access!",
    });
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    let errors = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ errors });
  } else if (error.name === "EMAIL_PASSWORD_REQUIRED") {
    res.status(400).json({ message: "EMAIL OR PASSWORD IS REQUIRED" });
  } else if (error.name === "USERNOTFOUND") {
    res.status(404).json({ message: "USER NOT FOUND" });
  } else {
    res.status(500).json;
  }
}

module.exports = errorHandler;
