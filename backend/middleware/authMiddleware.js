import jwt from "jsonwebtoken";

//this function checks for JWT token and gives us the info of the user in req.user
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "token expired or invalid" });
  }
};
