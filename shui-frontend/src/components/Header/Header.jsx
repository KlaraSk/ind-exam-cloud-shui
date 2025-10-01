import "./Header.css";

function Header({ children }) {
  return <header className="flex page__wrapper font-color__dark-brown header">{children}</header>;
}

export default Header;
