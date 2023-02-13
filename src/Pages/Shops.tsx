import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";

import { getAllShops } from "../actions/shop";
import { setShouldRefreshShopsData } from "../slices/shop";

import AddShopForm from "../components/Forms/AddShop";
import ShopCard from "../components/Cards/ShopCard";

const Shops = () => {
  const shops = useSelector((state: { shops: { data: any[] }}) => state.shops?.data);
  const refreshShopsData = useSelector((state: { Shops: { shouldRefreshData: boolean }}) => state.Shops?.shouldRefreshData);
  const [shopsError, setShopsError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getShops = useCallback(() => {
    // @ts-ignore
    dispatch(getAllShops(err => setShopsError(err)));
    // eslint-disable-next-line
  }, [refreshShopsData]);

  useEffect(() => {
    getShops();
    // eslint-disable-next-line
  }, [refreshShopsData]);

  const removeShop = (id: number) => {
     // @ts-ignore
    // dispatch(deleteShop(id));
    dispatch(setShouldRefreshShopsData(true));
  };

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
        Online Shops
      </Typography>
      <Box marginTop={3} display='grid' gridTemplateColumns='repeat(2, 1fr)' gap={3}>
        {!shopsError && !!shops?.length ? 
            shops.map((shop => {
              return <ShopCard key={shop.id} shop={shop} deleteShop={removeShop}/>
            })) :
                shopsError ? <Typography>{shopsError}</Typography> : 
                    <Typography>We don't have shops to show yet</Typography>
        }
      </Box>
      <Box>
        <Typography variant="h5" marginTop={15} marginBottom={2} color='text.secondary' >
          You can register your shops for free by filling out the form below:
        </Typography>
        <AddShopForm />
      </Box>
    </Container>
  );
};
 
export default Shops;