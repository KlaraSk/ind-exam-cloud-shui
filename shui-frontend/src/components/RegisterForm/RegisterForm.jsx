import { useForm } from "react-hook-form";
import { useRef } from "react";
import { registerApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";
import { PurpleButton } from "../../components-styled/Button/Button.styles";

function RegisterForm({ setIsLogin }) {
  const form = useRef();

  // Standard-regex för mail från MDN
  const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

  // Kräver följande: 1 versal, 1 gemen, 1 specialtecken, 1 siffra 0-9. Från sidan https://ihateregex.io/expr/password/. Älskar domännamnet.
  const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  // Godkända tecken för användarnamn: A-Ö,a-ö,0-9. Min 5 tecken, max 15 tecken. Regex från ChatGPT.
  const usernameRegEx = /^[A-Za-z0-9ÅÄÖåäö]{5,15}$/;

  // Validering från React Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "", email: "" } });

  const registerUser = async (data) => {
    const result = await registerApi({ ...data, role: "GUEST" });

    // Vid lyckad registrering sätts isLogin till true och användaren skickas till inloggningsformuläret.
    if (result.status === 201) {
      setIsLogin(true);
    }
  };

  return (
    <section className="page__wrapper font-color__dark-brown">
      <h1 className="heading-2 text-align-center">Registrera konto</h1>
      <p className="body text-align-center">Shui är din digitala anslagstavla. Skapa ett konto för att komma igång.</p>
      <form
        className="form label flex flex__column"
        noValidate
        ref={form}
        onSubmit={handleSubmit((data) => {
          registerUser(data);
        })}
      >
        {/*  ===== Användarnamn ===== */}
        <label className="flex flex__column form__label">
          Användarnamn
          <span className="form__error">{errors.username?.message}</span>
          <input
            type="text"
            className="form__input"
            autoComplete="Användarnamn"
            required
            {...register("username", {
              required: "Fyll i användarnamn",
              pattern: { value: usernameRegEx, message: "Användarnamnet får innehålla tecknen A-Ö, a-ö och 0-9. Minst 5, max 15 tecken" },
            })}
          />
        </label>
        {/*  ===== Email ===== */}
        <label className="flex flex__column form__label">
          Email
          <span className="form__error">{errors.email?.message}</span>
          <input
            type="text"
            className="form__input"
            autoComplete="Email"
            required
            {...register("email", {
              required: "Fyll i emailadress",
              pattern: { value: emailRegExp, message: "Fyll i en giltig mailadress" },
            })}
          />
        </label>
        {/*  ===== Lösenord ===== */}
        <label className="flex flex__column form__label">
          Lösenord <span className="form__error">{errors.password?.message}</span>
          <input
            type="password"
            className="form__input"
            defaultValue={"Test123!"}
            autoComplete="Lösenord"
            {...register("password", {
              required: "Fyll i lösenord",
              pattern: {
                value: passwordRegEx,
                message: "Lösenorder måste innehålla minst 1 stor och 1 liten bokstav, 1 specialtecken och 1 siffra.",
              },
            })}
            required
          />
        </label>
        <PurpleButton type={"submit"}>Registrera konto</PurpleButton>
      </form>
    </section>
  );
}

export default RegisterForm;
