import { Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebase";
import { AppContent } from "../context/AppContext";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const { isLoggedIn } = useContext(AppContent); // backend login

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  const isAuthenticated = isLoggedIn || firebaseUser;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
