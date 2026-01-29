import { useNavigate } from "react-router-dom";

function OAuthFailed() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Authentication Failed ❌</h2>
      <p>Google login/signup failed. Please try again.</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>

        <button 
          style={{ marginLeft: "10px" }} 
          onClick={() => navigate("/signup")}
        >
          Go to Signup
        </button>
      </div>
    </div>
  );
}

export default OAuthFailed;
