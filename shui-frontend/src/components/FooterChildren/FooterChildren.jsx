import { useNavigate } from "react-router-dom";
import { LinkButtonRed, PurpleButton } from "../../components-styled/Button/Button.styles";

function FooterChildren({ btnText, onSubmit }) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <PurpleButton type="submit" onClick={onSubmit} aria-label="Publicera meddelande">
        {btnText}
      </PurpleButton>
      <LinkButtonRed onClick={navigateBack} aria-label="Avbryt, tillbaka till föregående sida." className="heading-4">
        Avbryt
      </LinkButtonRed>
    </>
  );
}

export default FooterChildren;
