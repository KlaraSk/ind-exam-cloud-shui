import "./Footer.css";

function Footer({ children, extraClasses }) {
  return <footer className={`flex footer ${extraClasses}`}>{children}</footer>;
}

export default Footer;
