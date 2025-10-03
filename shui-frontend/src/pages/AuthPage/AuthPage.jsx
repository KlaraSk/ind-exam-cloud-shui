import { useState } from "react";
import { LinkButtonRed, LinkButtonPurple, BasicButton } from "../../components-styled/Button/Button.styles.js";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { toggleState } from "../../utils/utils.js";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <section className="page flex flex__column auth-page">
      <Header>
        <BasicButton onClick={() => navigate("/")}>
          <img className="auth-page__logo" src="./shui-logo.png" alt="Shui" />
        </BasicButton>
      </Header>
      {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
      <LinkButtonRed className="heading-4" onClick={() => toggleState(isLogin, setIsLogin)}>
        {isLogin ? "Registrera konto" : "Har du redan ett konto?"}
      </LinkButtonRed>
      <LinkButtonPurple onClick={() => navigate("/")} className="heading-4">
        Visa alla meddelanden
      </LinkButtonPurple>
    </section>
  );
}

export default AuthPage;
