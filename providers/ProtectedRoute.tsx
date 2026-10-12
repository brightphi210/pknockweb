import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }: any) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("pknockUserToken") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? element : null;
};

export default ProtectedRoute;