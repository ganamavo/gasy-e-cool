import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import { Product } from "../Cards/ProductCard";
import { setProducts } from "../../slices/product";
import { getAllProducts, filterProducts } from "../../actions/product";
import { setShops } from "../../slices/shop";
import { filterShops, getAllShops } from "../../actions/shop";
import { Shop } from "../Cards/ShopCard";
import AdvancedFiltersModal, { AppliedFilter } from "../Modals/AdvancedFilters";

const Header = () => {
  const products = useSelector((state: { products: { data: Product[] } }) => state.products?.data);
  const shops = useSelector((state: { shops: { data: Shop[] } }) => state.shops?.data);
  const [searchValue, setSearchValue] = useState('');
  const [showAdvancedFiltersModal, setShowAdvancedFiltersModal] = useState(false);

  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const onSearch = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setSearchValue(value);
    if(location === '/products') {
      if (value) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()) || product.description.toLowerCase().includes(value.toLowerCase()));
        dispatch(setProducts(filteredProducts));
      };
    } else {
      if (value) {
        const filteredShops = shops.filter(shop => shop.name.toLowerCase().includes(value.toLowerCase()) || shop.description.toLowerCase().includes(value.toLowerCase()));
        dispatch(setShops(filteredShops));
      };
    };
  };

  useEffect(() => {
    if(!searchValue) {
      if(location === '/products') {
        // @ts-ignore
        dispatch(getAllProducts());
      } else {
        // @ts-ignore
        dispatch(filterShops({ keywords: searchValue }));
      };
    }
  }, [searchValue]);

  const handleFilter = (appliedFilter: AppliedFilter) => {
    if(location === '/products') {
      delete appliedFilter.category;
      delete appliedFilter.third_operator;
      // @ts-ignore
      dispatch(filterProducts(appliedFilter));
    } else {
      // @ts-ignore
      dispatch(filterShops(appliedFilter));
    }
  };

  const clearFilter = () => {
    if(location === '/products') {
      // @ts-ignore
      dispatch(getAllProducts());
    } else {
      // @ts-ignore
      dispatch(getAllShops())
    };
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
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setSearchValue('')} sx={{ marginRight: '-10px' }}>
                <SearchIcon sx={{ marginTop: '4px' }}/>
              </IconButton>
            )
          }}
        />
        <Button
          variant="contained"
          onClick={() => setShowAdvancedFiltersModal(true)}
          startIcon={<FilterAltIcon />}
          sx={{ marginRight: '2rem' }}
        >
          Multiple filters
        </Button>
        <Tooltip title='Reload data' arrow placement="top">
          <IconButton
            color='primary'
            onClick={() => {
              clearFilter();
              setSearchValue('');
            }}
          >
            <HistoryIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <AdvancedFiltersModal
        open={showAdvancedFiltersModal}
        title={`Filter on ${location === '/products' ? 'product' : 'shops' }`}
        onClose={() => setShowAdvancedFiltersModal(false)}
        onSave={handleFilter}
        location={location}
      />
    </Box>
  );
}

export default Header;