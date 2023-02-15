import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { Product } from "../Cards/ProductCard";
import { setProducts, setShouldRefreshProductsData } from "../../slices/product";

const Header = () => {
  const products = useSelector((state: { products: { data: Product[] } }) => state.products?.data);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const onSearch = (event: { target: { value: string }}) => {
    setSearchValue(event.target.value)
    const { value } = event.target;
    if(value) {
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()) || product.description.toLowerCase().includes(value.toLowerCase()));
      dispatch(setProducts(filteredProducts));
    } else {
      dispatch(setShouldRefreshProductsData(true));
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 70,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <TextField
        size='small'
        label='Search by keywords'
        variant='outlined'
        value={searchValue}
        onChange={onSearch}
        id='search-product'
        sx={{
          width: 500,
          marginRight: '2rem',
          '& fieldset': {
            borderRadius: '16px',
          },
        }}
      />
    </Box>
  );
}

export default Header;