const jwt = require("jsonwebtoken");

//finds user with token and checks the role
const verifyToken = async (req, res, next) => {
  //verify user using token
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorised user",
    });
  }
  try {
    const { userId, role } = jwt.verify(token, process.env.JWT);

    req.userId = userId;
    req.useRole = role;
    next();
  } catch (error) {
    console.log("Error verifying token", error);
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.useRole || req.useRole != "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden - admin access required" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
