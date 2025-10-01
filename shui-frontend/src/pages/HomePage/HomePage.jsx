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
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { IoFilter } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";

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
    <section className="page home-page font-color__dark-brown">
      <Header className="home-page__header">
        <div className="flex flex__column home-page__auth-btn">
          <CircleButton onClick={!user ? handleLogin : handleLogout} aria-label={!user ? "Logga in" : "Logga ut"}>
            {<FaUser />}
          </CircleButton>
          <BasicButton
            onClick={!user ? handleLogin : handleLogout}
            aria-label={!user ? "Logga in" : "Logga ut"}
            className="label font-color__dark-brown"
          >
            {!user ? "Logga in" : "Logga ut"}
          </BasicButton>
          {user && <span className="label">{user.username}</span>}
        </div>

        <h1 className="heading-2 home-page__heading">Meddelanden</h1>
      </Header>
      <section className="page__wrapper">
        <section className="filters flex ">
          <h2 className="heading-4 page__wrapper flex filters__title">
            <IoFilter aria-hidden="true" />
            Filter
          </h2>
          <BasicButton className="flex font-color__dark-brown page__wrapper">
            {<span className="label">Nyast först</span>}
            {<FaArrowDown aria-hidden="true" className="font-color__dark-purple" />}
          </BasicButton>
          <BasicButton className="flex font-color__dark-brown page__wrapper">
            {<span className="label">Användare</span>}
            {<FaUsers aria-hidden="true" className="font-color__dark-purple" />}
          </BasicButton>
        </section>

        <List>{messages && generateMessages(messages)}</List>
      </section>

      <Footer extraClasses={"home-page__footer"}>
        <SquareButton
          aria-label="Skapa ett meddelande"
          onClick={!user ? () => navigate("/konto") : () => navigate("/meddelande")}
          className="home-page__edit-button"
        >
          <MdModeEditOutline />
        </SquareButton>
      </Footer>
    </section>
  );
}

export default HomePage;
