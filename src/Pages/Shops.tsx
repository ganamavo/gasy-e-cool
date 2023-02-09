import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";

import AddShopForm from "../components/Forms/AddShop";
import { getAllShops } from "../actions/shop";
import { setShouldRefreshShopsData } from "../slices/shop";

const Shops = () => {
  const shops = useSelector((state: { shops: { data: any[] }}) => state.shops?.data);
  const refreshShopsData = useSelector((state: { Shops: { shouldRefreshData: boolean }}) => state.Shops?.shouldRefreshData);
  const [shopsError, setShopsError] = useState<string | null>(null);
  const dispatch = useDispatch();
    console.log('shops::::::', shops);
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
        All available Shops
      </Typography>
      <Box>
        <Typography variant="h4" marginTop={15} marginBottom={2} color='primary' >
          You can register your shops for free by filling out the form below:
        </Typography>
        <AddShopForm />
      </Box>
    </Container>
  );
};
 
export default Shops;