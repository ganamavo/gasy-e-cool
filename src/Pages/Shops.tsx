import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";

import { deleteShop, editSingleShop, getAllShops } from "../actions/shop";
import { setShops } from "../slices/shop";

import AddShopForm from "../components/Forms/AddShop";
import ShopCard, { Shop } from "../components/Cards/ShopCard";
import ConfirmDeletionModal from "../components/Modals/ConfirmDeletion";
import EditProductModal from "../components/Modals/EditProduct";
import EditShopModal from "../components/Modals/EditShop";

const Shops = () => {
  const shops = useSelector((state: { shops: { data: any[] } }) => state.shops?.data);
  const refreshShopsData = useSelector((state: { Shops: { shouldRefreshData: boolean } }) => state.Shops?.shouldRefreshData);
  const [shopsError, setShopsError] = useState<string | null>(null);
  const [showEditShopModal, setShowEditShopModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shopId, setShopId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<Shop | null>(null);
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

  const removeShop = () => {
    const filteredShops = shops.filter(shop => shop.id !== shopId);
    dispatch(setShops(filteredShops));
    // @ts-ignore
    dispatch(deleteShop(shopId));
    setShowDeleteModal(false);
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
          shops.map((shop => (
            <ShopCard
              key={shop.id}
              shop={shop}
              editShop={() => {
                setShowEditShopModal(true);
                setModalData(shop);
              }}
              deleteShop={(id) => {
                setModalData(shop);
                setShopId(id);
                setShowDeleteModal(true);
              }}
              favoriteShop={(id, is_favourited) => {
                //@ts-ignore
                dispatch(editSingleShop(id, { is_favourited: !is_favourited }));
              }}
            />
          ))) :
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
      {showEditShopModal && modalData && (
        <EditShopModal
          open
          onClose={() => setShowEditShopModal(false)}
          data={modalData}
        />
      )}
      <ConfirmDeletionModal
        title={`Delete ${modalData?.name}`}
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={removeShop}
      />
    </Container>
  );
};

export default Shops;