import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { Product } from "../Cards/ProductCard";
import { setProducts } from "../../slices/product";
import { getAllProducts } from "../../actions/product";
import { setShops } from "../../slices/shop";
import { filterShops, getAllShops } from "../../actions/shop";
import { Shop } from "../Cards/ShopCard";
import AdvancedFiltersModal, { AppliedFilter } from "../Modals/AdvancedFilters";

const Header = () => {
  const products = useSelector((state: { products: { data: Product[] } }) => state.products?.data);
  const shops = useSelector((state: { shops: { data: Shop[] } }) => state.shops?.data);
  const [searchValue, setSearchValue] = useState('');
  const [showAdvancedFiltersModal, setShowAdvancedFiltersModal] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const onSearch = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setSearchValue(value);
    if(location.pathname === '/products') {
      if (value) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()) || product.description.toLowerCase().includes(value.toLowerCase()));
        dispatch(setProducts(filteredProducts));
      } else {
        // @ts-ignore
        dispatch(getAllProducts());
      }
    };

    if(location.pathname === '/online-shops') {
      if (value) {
        const filteredShops = shops.filter(shop => shop.name.toLowerCase().includes(value.toLowerCase()) || shop.description.toLowerCase().includes(value.toLowerCase()));
        dispatch(setShops(filteredShops));
      } else {
        // @ts-ignore
        dispatch(getAllShops());
      }
    };
  };

  const handleShopsFilter = (appliedFilter: AppliedFilter) => {
    // @ts-ignore
    dispatch(filterShops(appliedFilter));
  }

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '2rem' }}>
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
        <Button
          variant="contained"
          onClick={(e) => setShowAdvancedFiltersModal(true)}
        >
          Multiple filters
        </Button>
      </Box>
      <AdvancedFiltersModal
        open={showAdvancedFiltersModal}
        title={`Filter on ${location.pathname === '/products' ? 'product' : 'shops' }`}
        onClose={() => setShowAdvancedFiltersModal(false)}
        onSave={handleShopsFilter}
        location={location.pathname}
      />
    </Box>
  );
}

export default Header;