import jwt from "jsonwebtoken";

const { verify } = jwt;

const config = process.env;

//Custom middleware to verify the JSON web token
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    console.log(`Request Token: ${token}`);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(`Server Token: ${process.env.TOKEN}`);
    const decoded = verify(token, process.env.TOKEN);
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    console.error(err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;