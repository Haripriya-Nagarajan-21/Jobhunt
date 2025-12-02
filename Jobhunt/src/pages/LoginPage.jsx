import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-context';
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock'; // Lock icon import

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
        padding: 2,
        overflow: 'hidden' // Ensure overflow is hidden
      }}
    >
      <Container maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 4,
            bgcolor: 'background.paper',
            boxShadow: 5,
            borderRadius: 2,
            border: '1px solid #ddd',
            opacity: 0.9
          }}
        >
          {/* Lock icon at the top */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <IconButton sx={{ fontSize: 50, color: '#0072ff' }}>
              <LockIcon />
            </IconButton>
          </Box>

          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#0072ff' }}>
            JobHunt Login
          </Typography>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              '& .MuiInputBase-root': { borderRadius: 1 }
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ minLength: 6 }}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              '& .MuiInputBase-root': { borderRadius: 1 }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 2,
              backgroundColor: '#0072ff',
              '&:hover': {
                backgroundColor: '#0056b3'
              }
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button size="small" onClick={() => navigate('/register')} sx={{ color: '#0072ff' }}>
              Sign up
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}