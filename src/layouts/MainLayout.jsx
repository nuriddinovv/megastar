import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("SessionId");
    if (!sessionId) {
      navigate("/login");
    }
  }, [navigate]);

  return <Outlet />;
}
