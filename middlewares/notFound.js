// Middleware for handling 404 page not found errors
const notFound = (req, res, next) => {
  res.status(404).json({
    error: "404 page not found",
    message: "page not found"
  });
};

module.exports = notFound;