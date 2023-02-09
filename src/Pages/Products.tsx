import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";

import { getAllProducts, deleteProduct, favoriteProduct } from "../actions/product";
import { setProducts } from "../slices/product";

import AddProductForm from "../components/Forms/PostProduct";
import ProductCard, { Product } from "../components/Cards/ProductCard";

const Products = () => {
  const products = useSelector((state: { products: { data: Product[] }}) => state.products?.data);
  const refreshProductsData = useSelector((state: { products: { shouldRefreshData: boolean }}) => state.products?.shouldRefreshData);
  const [productsError, setProductsError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getProducts = useCallback(() => {
    // @ts-ignore
    dispatch(getAllProducts(err => setProductsError(err)));
    // eslint-disable-next-line
  }, [refreshProductsData]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [refreshProductsData]);

  const removeProduct = (id: number) => {
    const filteredProducts = products.filter(product => product.id !== id);
    dispatch(setProducts(filteredProducts));
     // @ts-ignore
    dispatch(deleteProduct(id));
  }

  const addToFavorite = (id: number, is_favourited: boolean) => {
    const updatedProducts = products.map(product => {
      if(product.id === id) {
        return {
          ...product,
          is_favourited: !product.is_favourited
        }
      }
      return product;
    });
    dispatch(setProducts(updatedProducts));
    // @ts-ignore
    dispatch(favoriteProduct(id, { is_favourited: !is_favourited }))
  }

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
        {!productsError && !!products?.length ? 
            products.map((product => {
              return <ProductCard key={product.id} product={product} deleteProduct={removeProduct} favoriteProduct={addToFavorite}/>
            })) :
                  productsError ? <Typography>{productsError}</Typography> : 
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