import { useContext, useEffect, useState } from "react";
import { putMessageById } from "../../api/messages";
import "./EditMessagePage.css";
import Header from "../../components/Header/Header";
import HeaderChildren from "../../components/HeaderChildren/HeaderChildren";
import Footer from "../../components/Footer/Footer";
import FooterChildren from "../../components/FooterChildren/FooterChildren";
import MessageForm from "../../components/MessageForm/MessageForm";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { MessagesContext } from "../../App";

function EditMessagePage() {
  const [oldMessage, setOldMessage] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuthStore();

  const messageId = params.messageId;

  const { messages, isListEdited, setIsListEdited } = useContext(MessagesContext);

  // Hämtar det gamla meddelandet
  useEffect(() => {
    const getMessageById = messages?.filter((obj) => obj.GSI1SK === messageId);
    setOldMessage(getMessageById);
  }, [messages]);

  const sendValidatedForm = async (e) => {
    e.preventDefault();
    console.log("sendValidatedForm");
    console.log(newMessage);

    const result = await putMessageById(messageId, newMessage, user.token);
    if (result.status === 200) {
      const prevValue = isListEdited;
      setIsListEdited(!prevValue);
      navigate("/");
    } else setError(result);
  };

  return (
    <section className="page">
      {" "}
      <Header className="add-message-page__header">
        <HeaderChildren title="Ändra meddelande" />
      </Header>
      <MessageForm
        sendValidatedForm={sendValidatedForm}
        oldMessage={oldMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setOldMessage={setOldMessage}
        error={error}
        isEditPage={true}
      />
      <Footer extraClasses={"flex__column page__wrapper"}>
        <FooterChildren btnText={"Publicera"} onSubmit={sendValidatedForm} />{" "}
      </Footer>
    </section>
  );
}

export default EditMessagePage;
