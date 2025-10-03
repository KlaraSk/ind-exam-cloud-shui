import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../stores/useAuthStore.js";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to={"/konto"} />;

  return children;
}

export default ProtectedRoute;
