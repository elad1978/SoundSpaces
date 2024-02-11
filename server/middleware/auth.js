import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    //let token = req.headers.authorization.split(" ")[1];
    let token = req.header("authorization");

    if (!token) return res.status(401).send("Access Denied");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
