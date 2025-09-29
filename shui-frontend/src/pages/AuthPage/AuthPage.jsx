import { useState } from "react";
import { LinkButton } from "../../components-styled/Button/Button.styles.js";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    const prevValue = isLogin;
    setIsLogin(!prevValue);
  };

  return (
    <section className="page flex flex__column auth-page">
      {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
      <LinkButton className="heading-4" onClick={toggleForm}>
        {isLogin ? "Registrera konto" : "Har du redan ett konto?"}
      </LinkButton>
    </section>
  );
}

export default AuthPage;
