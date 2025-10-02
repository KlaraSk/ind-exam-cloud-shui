import "./HeaderChildren.css";
import { IoIosArrowBack } from "react-icons/io";
import { BasicButton } from "../../components-styled/Button/Button.styles";
import { useNavigate } from "react-router-dom";

function HeaderChildren({ title }) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BasicButton aria-label="Tillbaka till sidan du kom ifrån." onClick={navigateBack}>
        <IoIosArrowBack style={{ fontSize: "1.5rem", strokeWidth: "20px" }} color="var(--dark-brown)" />
      </BasicButton>
      <h1 className="heading-4 header-children__title">{title}</h1>
    </>
  );
}

export default HeaderChildren;
