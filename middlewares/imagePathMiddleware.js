const setImagePath = (req , res , next) => {

  req.setImagePath = `${req.protocol}://${req.get("hots")}/assets/public/imgs`;
  next()
}
module.exports = setImagePath