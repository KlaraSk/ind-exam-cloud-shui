import { SquareButtonSmall } from "../../components-styled/Button/Button.styles";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import "./SortArrows.css";

function SortArrows({ sortByCreatedAt, isNewestFirst }) {
  const generateArrow = isNewestFirst ? (
    <FaArrowDown className="font-color__beige filters__arrow" />
  ) : (
    <FaArrowUp className="font-color__beige filters__arrow" />
  );

  return (
    <div className="flex sort" onClick={sortByCreatedAt} aria-label="Sortera på datum">
      {<span className="label">Sortera</span>}

      <SquareButtonSmall aria-label="Sortera på datum" className="flex ">
        {generateArrow}
      </SquareButtonSmall>
    </div>
  );
}

export default SortArrows;
