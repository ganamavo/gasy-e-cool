import { Button, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 
import axios from "axios";
import Logo from "../components/Forms/Logo";

const Home = ({ setAuth }: {setAuth: any}) => {
  const theme = useTheme();

  const handleLogout = async() => {
    try {
      await axios.delete('htpp://localhost:4000/logout');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ mb: 5, mt: -10 }}>
        <Logo />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "-4rem",
          fontSize: "5rem",
          fontWeight: 700,
          letterSpacing: "-0.5rem",
          display: "inline-block",
          whiteSpace: "nowrap",
          [theme.breakpoints.down("sm")]: {
            fontSize: "4rem",
            letterSpacing: "-0.4rem",
          },
        }}
        gutterBottom
      >
        Welcome Back
      </Typography>

      <Button size="large" variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </Container>
  );
};
 
export default Home;