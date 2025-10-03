import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = user;
  const token = jwt.sign(payload, "lasuasnv64vre981", { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, "lasuasnv64vre981");
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
