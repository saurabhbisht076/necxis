import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../utils/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Next.js MUI App
        </Typography>
        <Box>
          {user ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                Hello, {user.displayName || user.email}
              </Typography>
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body1">Not logged in</Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}