import { Typography, Container, Stack } from "@mui/material";

const Home = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: '100vh'
      }}
    >
      <Typography variant="h2" color='primary' >
        Innovative thinking helps you dream big!
      </Typography>
      <Stack sx={{ mt: 5 }} gap={2} alignItems='center' justifyContent='center' >
        <Typography variant="h4" color='secondary' >
          Welcome to <strong>E-Gasy-Cool</strong>
        </Typography>
        <Typography>
          To help with the advance of your country, technologies should first come to mind. This platform is built to help you show our creativity to everyone, share our experience with the ones in need and contact each other for anything. 
        </Typography>
        <Typography>
          If you find yourself struggling to find the right mentors or a good place to show off what you are doing, you are coming to the right place because here, you can post any of your products, tutos, PDF,... You can also contact a person who you want to assist you with anything.
        </Typography>
      </Stack>
    </Container>
  );
};
 
export default Home;