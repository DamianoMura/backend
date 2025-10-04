// Middleware for setting image path on the request object
const setImagePath = (req, res, next) => {
  req.setImagePath = `${req.protocol}://${req.get("host")}/assets/public/imgs`;
  next();
};

module.exports = setImagePath;