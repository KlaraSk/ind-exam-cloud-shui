import Joi from "joi";

// Kräver följande: 1 versal, 1 gemen, 1 specialtecken, 1 siffra 0-9. Från sidan https://ihateregex.io/expr/password/. Älskar domännamnet.
const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(15).required(),
  password: Joi.string()
    .pattern(passwordRegEx)
    .messages({
      "string.pattern.base": "Lösenordet måste innehålla minst en stor bokstav, en liten bokstav, ett specialtecken och en siffra.",
    })
    .required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("GUEST", "ADMIN").required().messages({ "any.only": "Roll får endast vara GUEST eller ADMIN" }),
});
