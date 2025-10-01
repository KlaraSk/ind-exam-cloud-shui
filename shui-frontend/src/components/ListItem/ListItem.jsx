import { useContext } from "react";
import { MessagesContext } from "../../App";
import { useAuthStore } from "../../stores/useAuthStore";
import { formatDate } from "../../utils/utils";
import MessageMenu from "../MessageMenu/MessageMenu";
import "./ListItem.css";

function ListItem({ item }) {
  const { user } = useAuthStore();

  const isLoggedInUser = () => {
    if (user) {
      if (user.username === item.attributes.user) return true;
    } else return false;
  };

  return (
    <li className="list-item font-color-light-grey">
      <div className="flex list-item__top">
        <h2 className="heading-4">
          {item.attributes.user}
          {isLoggedInUser() && <span> (jag)</span>}
        </h2>
        {isLoggedInUser() && <MessageMenu messageId={item.GSI1SK}></MessageMenu>}
      </div>

      <p className="body list-item__message">{item.attributes.message}</p>
      <span className="label list-item__date">{formatDate(item.attributes.createdAt)}</span>
    </li>
  );
}

export default ListItem;
