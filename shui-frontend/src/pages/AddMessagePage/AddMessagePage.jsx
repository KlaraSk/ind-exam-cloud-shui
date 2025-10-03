import { useContext, useState } from "react";
import { postMessage } from "../../api/messages";
import MessageForm from "../../components/MessageForm/MessageForm";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderChildren from "../../components/HeaderChildren/HeaderChildren";
import FooterChildren from "../../components/FooterChildren/FooterChildren";
import { MessagesContext } from "../../App";
import { toggleState } from "../../utils/utils";

function AddMessagePage() {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState({});
  const { user } = useAuthStore();
  const [error, setError] = useState(null);

  const { isListEdited, setIsListEdited } = useContext(MessagesContext);

  const sendValidatedForm = async (e) => {
    e.preventDefault();

    const result = await postMessage(newMessage, user.token);

    if (result.status === 201) {
      toggleState(isListEdited, setIsListEdited);
      navigate("/");
    } else setError(result);
  };

  return (
    <section className="page">
      <Header className="add-message-page__header">
        <HeaderChildren title="Skapa meddelande" />
      </Header>

      <MessageForm sendValidatedForm={sendValidatedForm} newMessage={newMessage} setNewMessage={setNewMessage} error={error} />
      <Footer extraClasses={"flex__column page__wrapper"}>
        <FooterChildren btnText={"Publicera"} onSubmit={sendValidatedForm} />
      </Footer>
    </section>
  );
}

export default AddMessagePage;
