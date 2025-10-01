import { useContext, useState } from "react";
import "./MessageMenu.css";
import { HiDotsVertical } from "react-icons/hi";
import clsx from "clsx";
import { BasicButton } from "../../components-styled/Button/Button.styles";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { deleteMessage } from "../../api/messages";
import { useAuthStore } from "../../stores/useAuthStore";
import { MessagesContext } from "../../App";
import { useNavigate } from "react-router-dom";

function MessageMenu({ messageId }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isListEdited, setIsListEdited } = useContext(MessagesContext);

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const classnames = clsx("label menu__list flex flex__column", {
    "d-none": !isOpen,
  });

  const toggleOpen = () => {
    const prevValue = isOpen;
    setIsOpen(!prevValue);
  };

  const handleEditMsg = () => {
    navigate(`/meddelande/${messageId}`);
  };

  const handleDeleteMsg = async () => {
    await deleteMessage(messageId, user.token);
    const prevValue = isListEdited;
    setIsListEdited(!prevValue);
  };

  return (
    <nav className="menu">
      <BasicButton onClick={toggleOpen}>
        <HiDotsVertical />
      </BasicButton>

      <ul className={classnames}>
        <li className="menu__list-item ">
          {
            <BasicButton onClick={handleEditMsg} aria-label="Ändra meddelande" className="label flex font-color__white">
              {<MdModeEditOutline />}
              Ändra
            </BasicButton>
          }
        </li>
        <li>
          {
            <BasicButton onClick={handleDeleteMsg} aria-label="Radera meddelande" className="label flex font-color__white">
              {<MdDelete />}Radera
            </BasicButton>
          }
        </li>
      </ul>
    </nav>
  );
}

export default MessageMenu;
