import { Navigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

interface ProtectedProps {
  children: JSX.Element; // Define the type of children to ensure only valid JSX is passed
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default Protected;
