import { useEffect, useState } from "react";
import { postMessage } from "../../api/messages";
import "./AddMessagePage.css";
import MessageForm from "../../components/MessageForm/MessageForm";
import { IoIosArrowBack } from "react-icons/io";
import { BasicButton, LinkButtonRed, PurpleButton } from "../../components-styled/Button/Button.styles";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function AddMessagePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({});
  const { user } = useAuthStore();
  const [error, setError] = useState(null);

  const handleClick = () => {
    navigate(-1);
  };

  const sendValidatedForm = async (e) => {
    e.preventDefault();

    const result = await postMessage(message, user.token);

    if (result.status === 201) navigate("/");
    else setError(result);
  };

  return (
    <section className="page">
      <Header className="add-message-page__header">
        <BasicButton aria-label="Tillbaka till sidan du kom ifrån." onClick={handleClick}>
          <IoIosArrowBack style={{ fontSize: "1.5rem", strokeWidth: "20px" }} color="var(--dark-brown)" />
        </BasicButton>
        <h1 className="heading-4 add-message-page__title">Skapa meddelande</h1>
      </Header>

      <MessageForm sendValidatedForm={sendValidatedForm} message={message} setMessage={setMessage} error={error} />
      <Footer extraClasses={"flex__column page__wrapper"}>
        <PurpleButton type="submit" onClick={sendValidatedForm} aria-label="Publicera meddelande">
          Publicera
        </PurpleButton>
        <LinkButtonRed onClick={handleClick} aria-label="Avbryt, tillbaka till föregående sida." className="heading-4">
          Avbryt
        </LinkButtonRed>
      </Footer>
    </section>
  );
}

export default AddMessagePage;
