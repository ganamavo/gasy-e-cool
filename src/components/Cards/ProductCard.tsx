import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
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
}

interface ProductCardProps {
    product: Product;
    deleteProduct: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, deleteProduct }) => {

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        title={product.name}
        subheader={product.createdAt}
        action={
          <IconButton onClick={() => deleteProduct(product.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        height="194"
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;