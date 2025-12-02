import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-context";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8faff",
      }}
    >
      {/* LEFT FORM SECTION */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Welcome Back 👋
          </Typography>

          <Typography sx={{ mb: 3, color: "#555" }}>
            Login to continue your job search journey.
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <div style={{ textAlign: "right", marginTop: "8px" }}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Button>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                backgroundColor: "#0d6efd",
                "&:hover": { backgroundColor: "#0b5ed7" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          <Typography sx={{ mt: 3, textAlign: "center" }}>
            New to JobHunt?{" "}
            <Button
              sx={{ textTransform: "none", color: "#0d6efd" }}
              onClick={() => navigate("/register")}
            >
              Create an account
            </Button>
          </Typography>
        </Box>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#eef4ff",
          overflow: "hidden",
        }}
      >
        <img
          src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Login Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
