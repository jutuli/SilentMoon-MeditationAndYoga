import { Navigate } from "react-router-dom";
import { useMainContext } from "../context/MainProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loading } = useMainContext();

  if (loading) {
    return (
      <div className="text-dark-green flex flex-1 items-center justify-center text-center font-bold">
        Loading Session...
      </div>
    );
  }

  return <>{isLoggedIn ? children : <Navigate to={"/"} replace />}</>;
};

export default ProtectedRoute;
