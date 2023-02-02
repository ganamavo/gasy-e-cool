import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";
import AddProductForm from "../components/Forms/PostProduct";
import ProductCard, { Product } from "../components/Cards/ProductCard";
import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "../actions/product";

const Products = () => {
  const products = useSelector((state: { products: { data: Product[] }}) => state.products?.data);
  const [productsError, setProductsError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getProducts = useCallback(() => {
    // @ts-ignore
    dispatch(getAllProducts(err => setProductsError(err)));
  }, []);

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 4
      }}
    >
      <Typography variant="h3" marginTop={15} color='primary' >
        All available products
      </Typography>
      <Box marginTop={3} display='grid' gridTemplateColumns='repeat(2, 1fr)' gap={3}>
        {!!products?.length ? 
          products.map((product => <ProductCard key={product.id} product={product} />))
          :
          <Typography>We don't have products to show yet</Typography>
        }
      </Box>
      <Box>
        <Typography variant="h4" marginTop={15} marginBottom={2} color='primary' >
          You can add your product for free
        </Typography>
        <AddProductForm />
      </Box>
    </Container>
  );
};
 
export default Products;