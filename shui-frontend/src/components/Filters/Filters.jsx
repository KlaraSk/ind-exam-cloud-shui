import "./Filters.css";

import { IoFilter } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { MessagesContext } from "../../App";
import Checkboxes from "../Checkboxes/Checkboxes";
import { filterMessages, sortByDate, toggleState } from "../../utils/utils";
import SortArrows from "../SortArrows/SortArrows";

// * Valde mellan att använda mitt API-anrop som har inbyggda queryparameterar (sort och user) eller att utgå från listan med alla meddelanden som hämtas från databasen vid start. Valde det sistnämnda alternativet av två anledningar:
// * 1. Hålla nere antalet API-anrop.
// * 2. Ha möjlighet att filtrera på fler än en användare, utan att behöva bygga om API-anropet.

function Filters() {
  // Context
  const { setMessages, users, allMessages } = useContext(MessagesContext);

  // Statevariabler
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Uppdaterar listan över filtrerade användare
  const handleChange = (e) => {
    if (e.target.checked) {
      const updatedArr = [...filteredUsers, e.target.name];
      setFilteredUsers(updatedArr);
    } else {
      const updatedArr = filteredUsers.filter((item) => item !== e.target.name);
      setFilteredUsers(updatedArr);
    }
  };

  // Togglar nyast/äldst först vid knapptryck på "Sortera"
  const sortByCreatedAt = (e) => {
    e.preventDefault();
    toggleState(isNewestFirst, setIsNewestFirst);
  };

  // Uppdaterar meddelandelistan vid förändring i filtrering
  useEffect(() => {
    let currentList = allMessages;

    // Om inga användare är icheckade sorteras "originallistan"
    if (filteredUsers.length > 0) {
      currentList = filterMessages(allMessages, filteredUsers);
    }

    // Aktuell lista (filtrerad eller original) sorteras och sätts i statevariablen messages.
    const filteredAndSortedList = sortByDate(currentList, isNewestFirst);
    setMessages(filteredAndSortedList);
  }, [isNewestFirst, filteredUsers]);

  return (
    <section className="filters flex">
      <div>
        <div className="flex filters__users-title">
          {<IoFilter aria-hidden="true" className="font-color__dark-purple" />}
          {<span className="heading-4">Filtrera på användare</span>}
        </div>
        <form className="users">
          <Checkboxes users={users} handleChange={handleChange} />
        </form>
      </div>
      <SortArrows sortByCreatedAt={sortByCreatedAt} isNewestFirst={isNewestFirst} />
    </section>
  );
}

export default Filters;
