import { useContext, useEffect, useState } from "react";
import { getMessages } from "../../api/messages";
import "./HomePage.css";
import List from "../../components/List/List";
import ListItem from "../../components/ListItem/ListItem";
import { BasicButton, CircleButton, SquareButton } from "../../components-styled/Button/Button.styles";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { MessagesContext } from "../../App.jsx";
import { MdModeEditOutline } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";

function HomePage() {
  const [messages, setMessages] = useState([]);

  const { isListEdited } = useContext(MessagesContext);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const setupMessages = async () => {
      const response = await getMessages();
      setMessages(response.data);
    };
    setupMessages();
  }, [isListEdited]);

  const generateMessages = (arr) => {
    return arr.map((item) => <ListItem item={item} key={item.SK}></ListItem>);
  };

  const handleLogout = () => {
    logout();
  };
  const handleLogin = () => {
    navigate("/konto");
  };

  return (
    <section className="page home-page">
      <header className="page__wrapper flex home-page__header ">
        <div className="flex flex__column home-page__auth-btn">
          <CircleButton onClick={!user ? handleLogin : handleLogout} aria-label={!user ? "Logga in" : "Logga ut"}>
            {<FaUser />}
          </CircleButton>
          <BasicButton
            onClick={!user ? handleLogin : handleLogout}
            aria-label={!user ? "Logga in" : "Logga ut"}
            className="label font-color__dark-grey"
          >
            {!user ? "Logga in" : "Logga ut"}
          </BasicButton>
        </div>

        <h1 className="heading-2 home-page__heading">Meddelanden</h1>
      </header>
      <section className="page__wrapper">
        <BasicButton className="flex font-color__dark-grey">
          {<span className="label">Nyast först</span>}
          {<FaArrowDown className="font-color__dark-purple" />}
        </BasicButton>
        <List>{messages && generateMessages(messages)}</List>
      </section>

      <footer className="footer flex home-page__footer">
        <SquareButton onClick={!user ? () => navigate("/konto") : () => navigate("/meddelande")} className="home-page__edit-button">
          <MdModeEditOutline />
        </SquareButton>
      </footer>
    </section>
  );
}

export default HomePage;
