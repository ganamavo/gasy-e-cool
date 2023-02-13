import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";

import { getAllProducts, deleteProduct, editSingleProduct } from "../actions/product";
import { setProducts } from "../slices/product";

import AddProductForm from "../components/Forms/AddProduct";
import ProductCard, { Product } from "../components/Cards/ProductCard";
import EditProductModal from "../components/Modals/EditProduct";
import ConfirmDeletionModal from "../components/Modals/ConfirmDeletion";

const Products = () => {
  const products = useSelector((state: { products: { data: Product[] } }) => state.products?.data);
  const refreshProductsData = useSelector((state: { products: { shouldRefreshData: boolean } }) => state.products?.shouldRefreshData);
  const [productsError, setProductsError] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<Product | null>(null);

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

  const removeProduct = () => {
    const filteredProducts = products.filter(product => product.id !== productId);
    dispatch(setProducts(filteredProducts));
    // @ts-ignore
    dispatch(deleteProduct(productId));
  };

  const addToFavorite = (id: number, is_favourited: boolean) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          is_favourited: !product.is_favourited
        }
      }
      return product;
    });
    dispatch(setProducts(updatedProducts));
    // @ts-ignore
    dispatch(editSingleProduct(id, { is_favourited: !is_favourited }))
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: '1488px',
        marginX: 'auto',
        paddingBottom: 4,
        paddingX: 4
      }}
    >
      <Typography variant="h4" marginTop={5} marginBottom={2} color='primary' >
        All available products
      </Typography>
      <Typography color='text.secondary' marginBottom={2}>
        E-Gasy-Cool has featured some amazing products that suit your needs to ensure that you benefit from visiting this platform.
        If any of these products arises your interest, and that you want to get them into your house, don't hesitate to reach out to the owner whose contact is already written on each card.
      </Typography>
      <Typography color='text.secondary' marginBottom={2}>
        You can also favorite a product that you think should be recommended to anyone that uses this platform to look for any available products.
      </Typography>
      <Typography color='text.secondary' marginBottom={2}>
        We allow everyone to post materials, tools, anything they want to share with their friends.
      </Typography>
      <Box marginTop={3} display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={2}>
        {!productsError && !!products?.length ?
          products.map((product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                deleteProduct={id => {
                  const singleProduct = products.find(product => product.id === id) || null;
                  setModalData(singleProduct);
                  setShowDeleteModal(true);
                  setProductId(id);
                }}
                favoriteProduct={addToFavorite}
                editProduct={product => {
                  setShowEditProductModal(true);
                  setModalData(product);
                }}
              />
            )
          })) :
          productsError ?
            <Typography>{productsError}</Typography> :
            <Typography>We don't have products to show yet</Typography>
        }
      </Box>
      <Box maxWidth={600} marginX='auto'>
        <Typography variant="h4" marginTop={15} marginBottom={2} color='primary' >
          You can add your product for free
        </Typography>
        <AddProductForm />
      </Box>
      {showEditProductModal && modalData && (
        <EditProductModal
          open
          onClose={() => setShowEditProductModal(false)}
          data={modalData}
        />
      )}
      <ConfirmDeletionModal
        title={`Delete ${modalData?.name}`}
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={removeProduct}
      />
    </Box>
  );
};

export default Products;