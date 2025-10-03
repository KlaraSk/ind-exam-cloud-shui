import { useContext } from "react";
import "./HomePage.css";
import List from "../../components/List/List";
import ListItem from "../../components/ListItem/ListItem";
import { BasicButton, CircleButton, SquareButton } from "../../components-styled/Button/Button.styles";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { MessagesContext } from "../../App.jsx";
import { MdModeEditOutline } from "react-icons/md";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import ScrollButton from "../../components/ScrollButton/ScrollButton.jsx";

function HomePage() {
  // Databasanropet sker i App.jsx och sparas i Context för att enkelt kunna nås av fler komponenter.
  const { messages } = useContext(MessagesContext);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
      <Header className=" flex__column">
        <div className="flex flex__column page__wrapper home-page__header-content">
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
          <Filters />
        </div>
      </Header>
      <section className="page__wrapper">
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
        <ScrollButton></ScrollButton>
      </Footer>
    </section>
  );
}

export default HomePage;
