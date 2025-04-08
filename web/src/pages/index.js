import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  CircularProgress, 
  Alert,
  Card,
  CardContent
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Header from '../components/Header';
import FCMHandler from '../components/FCMHandler';
import { useAuth } from '../utils/useAuth';

export default function Home() {
  const { user, loading, error, signInWithGoogle } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error('Sign in error:', err);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <>
      <Header />
      {/* Hidden component that handles FCM tokens */}
      <FCMHandler />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Welcome to Next.js with MUI
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : user ? (
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  You are signed in!
                </Typography>
                <Typography variant="body1">
                  Name: {user.displayName}
                </Typography>
                <Typography variant="body1">
                  Email: {user.email}
                </Typography>
                {user.photoURL && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      style={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: '50%',
                        border: '2px solid #1976d2'
                      }} 
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mt: 4 
              }}
            >
              <Typography variant="h6" gutterBottom>
                Sign in to get started
              </Typography>
              
              {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                sx={{ mt: 1 }}
              >
                {signingIn ? <CircularProgress size={24} color="inherit" /> : 'Sign in with Google'}
              </Button>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  );
}