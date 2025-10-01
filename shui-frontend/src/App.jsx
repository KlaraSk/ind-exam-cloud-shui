import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import AddMessagePage from "./pages/AddMessagePage/AddMessagePage";
import RootLayout from "./root-layout/RootLayout";
import { createContext, useState } from "react";
import EditMessagePage from "./pages/EditMessagePage/EditMessagePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const MessagesContext = createContext(null);

function App() {
  // En statevariabel som togglas när användaren raderar ett meddelande. I HomePage ligger en useEffect som lyssnar efter förändringar i isListEdited. När användaren raderar ett meddelande uppdateras meddelandelistan.
  const [isListEdited, setIsListEdited] = useState(false);

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
    <MessagesContext.Provider value={{ isListEdited, setIsListEdited }}>
      <div className="app ">
        <RouterProvider router={router} />
      </div>
    </MessagesContext.Provider>
  );
}

export default App;
