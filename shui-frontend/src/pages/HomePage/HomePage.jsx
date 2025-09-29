import { useEffect, useState } from "react";
import { getMessages } from "../../api/messages";
import "./HomePage.css";
import { loginApi, registerApi } from "../../api/auth";

function HomePage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const setupMessages = async () => {
      const response = await getMessages();
      setMessages(response.data);
    };
    setupMessages();
    loginUser();
    // regTest();
  }, []);

  useEffect(() => {
    console.log("messages: ", messages);
  }, [messages]);

  const loginUser = async (e) => {
    // e.preventDefault();
    const result = await loginApi({
      username: "klara",
      password: "Test123!",
    });
    console.log(result.data.message);
  };

  const regTest = async (data) => {
    const result = await registerApi({
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.role,
    });
    console.log(result.data);
  };

  return <section className="page">HomePage</section>;
}

export default HomePage;
