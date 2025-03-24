import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Debug logging
    console.log("All localStorage keys:");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`${key}: ${localStorage.getItem(key)}`);
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("ProtectedRoute - isLoggedIn:", isLoggedIn);
    console.log(
      "ProtectedRoute - localStorage value:",
      localStorage.getItem("isLoggedIn")
    );

    // If not logged in, redirect to login
    if (!isLoggedIn) {
      console.log("Not logged in, redirecting to Login");
      navigate("/Login", { replace: true });
      return;
    }

    console.log("User is logged in, showing protected content");

    // Check if we've already replaced the history
    const historyReplaced =
      sessionStorage.getItem("historyReplaced") === "true";

    if (!historyReplaced) {
      // Replace the entire history stack with just the current page
      // This removes all previous history entries including signup and login
      window.history.replaceState(null, "", location.pathname);

      // Mark that we've replaced the history
      sessionStorage.setItem("historyReplaced", "true");

      console.log("Browser history has been replaced");
    }
  }, [navigate, location]);

  return children;
}

export default ProtectedRoute;
