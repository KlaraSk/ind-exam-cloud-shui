import { useForm } from "react-hook-form";

import "./LoginForm.css";
import { useRef, useState } from "react";
import { loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";
import { PurpleButton } from "../../components-styled/Button/Button.styles";
import { useAuthStore } from "../../stores/useAuthStore";

function LoginForm() {
  const form = useRef();
  const [error, setError] = useState({ isError: false, errorMsg: "" });
  let navigate = useNavigate();
  const { setToken } = useAuthToken();
  const login = useAuthStore((state) => state.login);
  const { user } = useAuthStore();

  // Validering från React Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  console.log(errors);

  const loginUser = async (data) => {
    const result = await loginApi(data);

    // Vid lyckad inloggning sparas token i localStorage (jepp, vet att det inte är optimalt, men vågar mig inte på cookies än). Användaren skickas till startsidan.
    if (result.status === 200) {
      setToken(result.data.token);
      login({ username: result.data.username, role: result.data.role, token: result.data.token });

      navigate("/");
    } else {
      setError({ isError: true, errorMsg: "Ogiltigt användarnamn eller lösenord" });
    }
  };

  return (
    <section className="page__wrapper font-color__dark-brown">
      <h1 className="heading-2 text-align-center">Logga in</h1>
      <p className="body text-align-center">Logga in för att skapa, redigera eller radera meddelanden.</p>
      <form
        className="form label flex flex__column"
        noValidate
        ref={form}
        onSubmit={handleSubmit((data) => {
          loginUser(data);
        })}
      >
        {/*  ===== Användarnamn ===== */}
        <label className="flex flex__column form__label ">
          Användarnamn
          <span className="form__error">
            {errors.username?.message}
            {error.errorMsg}
          </span>
          <input
            type="text"
            className="form__input"
            autoComplete="Användarnamn"
            required
            {...register("username", { required: "Fyll i användarnamn" })}
          />
        </label>
        {/*  ===== Lösenord ===== */}
        <label className="flex flex__column form__label">
          Lösenord{" "}
          <span className="form__error">
            {errors.password?.message}
            {error.errorMsg}
          </span>
          <input
            type="password"
            className="form__input"
            defaultValue={"Test123!"}
            autoComplete="Lösenord"
            {...register("password", { required: "Fyll i lösenord" })}
            required
          />
        </label>
        <PurpleButton type={"submit"}>Logga in</PurpleButton>
      </form>
    </section>
  );
}

export default LoginForm;
