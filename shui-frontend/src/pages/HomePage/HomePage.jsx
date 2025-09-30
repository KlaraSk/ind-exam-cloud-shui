import { useEffect, useState } from "react";
import { getMessages } from "../../api/messages";
import "./HomePage.css";

import List from "../../components/List/List";
import ListItem from "../../components/ListItem/ListItem";
import { BasicButton, PurpleButton, CircleButton } from "../../components-styled/Button/Button.styles";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function HomePage() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const setupMessages = async () => {
      const response = await getMessages();
      setMessages(response.data);
    };
    setupMessages();
  }, []);

  useEffect(() => {
    console.log("messages: ", messages);
  }, [messages]);

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
          <BasicButton aria-label={!user ? "Logga in" : "Logga ut"} className="label font-color__dark-grey">
            {!user ? "Logga in" : "Logga ut"}
          </BasicButton>
        </div>

        <h1 className="heading-2 home-page__heading">Meddelanden</h1>
      </header>
      <section className="page__wrapper">
        <List>{messages && generateMessages(messages)}</List>
      </section>

      <footer className="footer  home-page__footer">
        {/* //! Inloggad användare - vid klick på pennan kommer man till editpage. Ej inloggad till loginsida. Ska vara en penn-symbol istället, temporär knapp       */}
        <PurpleButton>penna</PurpleButton>
      </footer>
    </section>
  );
}

export default HomePage;
