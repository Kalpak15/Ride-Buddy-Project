// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../store/authSlice";


export default function OAuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const isNew = params.get("new") === "true";

    if (token) {
      // Save token to Redux
      dispatch(login({ token }));

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Redirect user
      if (isNew) {
        navigate("/profile"); // new user → complete profile
      } else {
        navigate("/home"); // existing user → dashboard
      }
    } else {
      navigate("/oauth-failed"); // something went wrong
    }
  }, [dispatch, navigate, location]);

  return <div>Logging in...</div>;
}
