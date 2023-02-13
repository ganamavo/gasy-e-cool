import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type Product = {
  id: number;
  name: string;
  createdAt: string;
  image_url: string;
  description: string;
  owner_email: string;
  owner_phone_number: string;
  owner_first_name: string;
  owner_last_name: string;
  is_favourited: boolean;
  image_alt_text: string;
  video_url: string;
  price: string;
}

interface ProductCardProps {
  product: Product | null;
  deleteProduct: (id: number) => void;
  favoriteProduct: (id: number, is_favourited: boolean) => void;
  editProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, deleteProduct, favoriteProduct, editProduct }) => {

  if (product) {
    return (
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          title={product.name}
          subheader={product.createdAt}
        />
        <CardMedia
          component="img"
          image={product.image_url}
          alt=""
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography marginTop={2} variant='body2' color="text.secondary">
            <strong>Published by: </strong>{product.owner_first_name} {product.owner_last_name}
          </Typography>
          <Typography variant='body2' color="text.secondary">
            <strong>Contact: </strong>{product.owner_email && product.owner_email + ' or'} {product.owner_phone_number}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => favoriteProduct(product.id, product.is_favourited)} aria-label="add to favorites">
            <FavoriteIcon color={product.is_favourited ? 'error' : 'inherit'} />
          </IconButton>
          <Stack direction='row' marginLeft='auto'>
            <IconButton onClick={() => editProduct(product)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteProduct(product.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
    );
  }
  return null;
}

export default ProductCard;