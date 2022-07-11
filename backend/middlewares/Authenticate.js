import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export default expressAsyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.indexOf("Bearer") === 0) {
    try {
      const bearer = req.headers.authorization.split(" ");
      req.user = jwt.verify(bearer[1], process.env.JWT_SECRET);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Authorization Failed");
    }
  } else {
    res.status(401);
    throw new Error("Authorization Required");
  }
});
