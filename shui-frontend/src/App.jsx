import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import AddMessagePage from "./pages/AddMessagePage/AddMessagePage";
import RootLayout from "./root-layout/RootLayout";
import { createContext, useEffect, useState } from "react";
import EditMessagePage from "./pages/EditMessagePage/EditMessagePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { getMessages } from "./api/messages";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "./stores/useAuthStore";

export const MessagesContext = createContext(null);

function App() {
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // En statevariabel som togglas när användaren raderar eller uppdaterar ett meddelande.
  const [isListEdited, setIsListEdited] = useState(false);

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const setupMessages = async () => {
      console.log("setupMessages()");

      const response = await getMessages();
      setAllMessages(response.data);
    };
    setupMessages();
  }, [isListEdited]);

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  useEffect(() => {
    // Extraherar nyckelvärdet user ur varje objekt
    const users = allMessages.map((obj) => obj.attributes.user);
    // Får bort alla dubbletter, men omvandlar till ett objekt
    const removeDuplicates = new Set(users);
    // Tjoffar tillbaka allt i en array
    // const usersArr = [...removeDuplicates];
    setUsers([...removeDuplicates]);
    // console.log("usersArr: ", usersArr);
  }, [allMessages]);

  // Skydd mot utlogg vid reload
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const decoded = jwtDecode(token);
    login({ username: decoded.attributes.username, role: decoded.attributes.role, token: token });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/konto", element: <AuthPage /> },
        {
          path: "/meddelande",
          element: (
            <ProtectedRoute>
              <AddMessagePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/meddelande/:messageId",
          element: (
            <ProtectedRoute>
              <EditMessagePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <MessagesContext.Provider value={{ isListEdited, setIsListEdited, setMessages, messages, users, allMessages, setAllMessages }}>
      <div className="app ">
        <RouterProvider router={router} />
      </div>
    </MessagesContext.Provider>
  );
}

export default App;
