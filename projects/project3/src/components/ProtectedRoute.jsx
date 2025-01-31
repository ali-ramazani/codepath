import { Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

function ProtectedRoute({ children }) {
  const session = useSession();

  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
