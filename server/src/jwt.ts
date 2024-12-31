const dotenv = require("dotenv");
dotenv.config();
const { sign, verify } = require("jsonwebtoken");

export const CreateToken = (user: any) => {
  const accessToken = sign(
    {
      username: user[0]["username"],
      user_id: user[0]["user_id"],
    },
    process.env.TOKEN_SECRET
  );

  return accessToken;
};

export const VerifyToken = (req: any, res: any, next: any) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ Error: "User Not Authenticated" });

  try {
    const validToken = verify(accessToken, process.env.TOKEN_SECRET);

    if (validToken) {
      req.authenticated = true;
      req.user = {
        user_id: validToken.user_id,
        username: validToken.username,
      };
      return next();
    }
  } catch (err) {
    return res.status(400).json({ Error: err });
  }
};
