import { Typography, Container, Box } from "@mui/material";

const Products = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: '100vh'
      }}
    >
      <Typography variant="h3" marginTop={15} color='primary' >
        All available products
      </Typography>
      <Box>
         
      </Box>
    </Container>
  );
};
 
export default Products;