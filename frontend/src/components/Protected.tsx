import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props: any) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by checking the token in localStorage
    const login = localStorage.getItem("token");

    if (!login) {
      // If no token, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
}
