import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

const isUser = localStorage.getItem('uid');

if (!isUser) {
    return <Navigate to="/" replace />;
  }

  return children;

} export default ProtectedRoute;