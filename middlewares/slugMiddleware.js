// Middleware for setting image path on the request object


const setSlugPath = (req,res,next) => {
  
  console.log("entering slugMiddleware request :");
  console.log("looking for products list")
  next();
  }

  module.exports=setSlugPath;