import "./Checkboxes.css";

function Checkboxes({ users, handleChange }) {
  const generateCheckboxes = (arr) => {
    return arr.map((item, idx) => (
      <li key={idx}>
        <label className="checkbox__container">
          <input className="users__checkbox" type="checkbox" onChange={(e) => handleChange(e)} name={item} />
          <span className="checkbox__checkmark"></span>
          {item}
        </label>
      </li>
    ));
  };

  return <ul className="flex label checkboxes__list">{generateCheckboxes(users)}</ul>;
}

export default Checkboxes;
