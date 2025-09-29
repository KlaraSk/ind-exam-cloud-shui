import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import AddMessagePage from "./pages/AddMessagePage/AddMessagePage";
import RootLayout from "./root-layout/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/konto", element: <AuthPage /> },
        { path: "/meddelande", element: <AddMessagePage /> },
      ],
    },
  ]);

  return (
    <div className="app ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
