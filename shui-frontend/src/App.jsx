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

export const MessagesContext = createContext(null);

function App() {
  const [messages, setMessages] = useState([]);
  console.log("test");

  // En statevariabel som togglas när användaren raderar ett meddelande. I HomePage ligger en useEffect som lyssnar efter förändringar i isListEdited. När användaren raderar ett meddelande uppdateras meddelandelistan.
  const [isListEdited, setIsListEdited] = useState(false);

  useEffect(() => {
    const setupMessages = async () => {
      const response = await getMessages();
      setMessages(response.data);
    };
    setupMessages();
  }, [isListEdited]);

  useEffect(() => {
    console.log("Sidan laddades om");
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
    <MessagesContext.Provider value={{ isListEdited, setIsListEdited, messages }}>
      <div className="app ">
        <RouterProvider router={router} />
      </div>
    </MessagesContext.Provider>
  );
}

export default App;
