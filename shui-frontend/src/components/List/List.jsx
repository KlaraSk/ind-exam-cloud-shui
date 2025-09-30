import "./List.css";

function List({ children }) {
  return <ul className="flex flex__column list">{children}</ul>;
}

export default List;
