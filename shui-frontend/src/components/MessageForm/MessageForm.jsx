import { useEffect, useRef, useState } from "react";
import "./MessageForm.css";
import { useForm } from "react-hook-form";
import { formatErrorMsg } from "../../utils/utils";

function MessageForm({ sendValidatedForm, message, setMessage, error }) {
  const form = useRef();

  // Varje gång inputen i textrutan ändras uppdateras statevariabeln message. Vid submit skickas innehållet i message till funktionen som postar ett nytt meddelande till databasen.
  const handleChange = (e) => setMessage({ message: e.target.value });

  useEffect(() => {
    if (error === null) return;

    const errormsg = formatErrorMsg(error);
    console.log("errormsg: ", errormsg);
  }, [error]);

  return (
    <form noValidate ref={form} onSubmit={sendValidatedForm} className="flex page__wrapper message-form">
      <label className="flex flex__column message-form__label ">
        <span className="label font-color__red">{formatErrorMsg(error)}</span>
        <textarea
          className="message-form__textarea body"
          value={message.message}
          onChange={handleChange}
          placeholder="Skriv ett meddelande..."
        />
      </label>
    </form>
  );
}

export default MessageForm;
