import Joi from "joi";

// Kräver följande: 1 versal, 1 gemen, 1 specialtecken, 1 siffra 0-9. Från sidan https://ihateregex.io/expr/password/. Älskar domännamnet.
const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

// Regex användarnamn. a-z,A-Z, 0-9 och åäö ok. Min fem tecken, max 15 tecken.
const usernameRegEx = /^[A-Za-z0-9ÅÄÖåäö]{5,15}$/;

export const userSchema = Joi.object({
  username: Joi.string().pattern(usernameRegEx).messages({ "string.pattern.base": "Valid characters: a-ö,A-Ö, 0-9" }).required(),
  password: Joi.string()
    .pattern(passwordRegEx)
    .messages({
      "string.pattern.base": "Lösenordet måste innehålla minst en stor bokstav, en liten bokstav, ett specialtecken och en siffra.",
    })
    .required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("GUEST", "ADMIN").messages({ "any.only": "Role must be  GUEST or ADMIN" }).required(),
});
