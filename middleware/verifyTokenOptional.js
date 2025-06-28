import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyTokenOptional = (req, res, next) => {
  const { token } = req.cookies;

  console.log("Logged in user token: ", token);

  if (!token) {
    req.userId = null;
    req.userPermission = "user"; // Default permission for guests
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    req.userPermission = payload.permission;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(new ErrorResponse("Unauthorized", 401));
  }

  console.log("User ID from token:", req.userId);
};

export default verifyTokenOptional;
