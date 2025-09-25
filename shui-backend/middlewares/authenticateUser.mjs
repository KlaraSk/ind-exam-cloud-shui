import { verifyToken } from "../utils/tokens.mjs";

export const authenticateUser = () => ({
  before: (handler) => {
    const authHeader = handler.event.headers?.Authorization || handler.event.headers?.authorization;

    if (!authHeader) throw new Error("No token provided.");

    const token = authHeader.split(" ")[1];
    try {
      const user = verifyToken(token);
      console.log("token: ", token);
      console.log("user: ", user);
      if (!user) throw new Error("Unauthorized");

      handler.event.user = user;
    } catch (error) {
      console.error("ERROR in authenticateUser()", error.message);
      throw new Error("Unauthorized");
    }
  },
});
