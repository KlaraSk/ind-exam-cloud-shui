import { formatDate } from "../../utils/utils";
import "./ListItem.css";

function ListItem({ item }) {
  return (
    <li className="list-item font-color-light-grey">
      <h2 className="heading-4">{item.attributes.user}</h2>
      <p className="body list-item__message">{item.attributes.message}</p>
      <span className="label list-item__date">{formatDate(item.attributes.createdAt)}</span>
    </li>
  );
}

export default ListItem;
