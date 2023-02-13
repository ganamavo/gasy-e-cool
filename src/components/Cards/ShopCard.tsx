import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type Shop = {
    id: number;
    name: string;
    createdAt: string;
    image_url: string;
    description: string;
    location: string;
    contact: string;
    facebook_link: string;
    twitter_link: string;
    category: string;
    is_favourited: boolean;
}

interface ShopCardProps {
    shop: Shop;
    deleteShop: (id: number) => void;
    editShop: () => void;
    favoriteShop: (id: number, is_favourited: boolean) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, deleteShop, editShop, favoriteShop }) => {

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        image={shop.image_url}
        alt=""
      />
      <CardHeader
        title={shop.name}
        subheader={shop.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {shop.description}
        </Typography>
        <Typography variant='body2' color="text.secondary">
          <strong>Category: </strong>{shop.category}
        </Typography>
        <Typography variant='body2' color="text.secondary">
          <strong>Contact: </strong>{shop.contact}
        </Typography>

        <Typography variant='body2' color="text.secondary">
          <strong>Facebook: </strong>{shop.facebook_link || 'N/A'}
        </Typography>
        <Typography variant='body2' color="text.secondary">
            <strong>Twitter: </strong>{shop.twitter_link || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => favoriteShop(shop.id, shop.is_favourited)} aria-label="add to favorites">
          <FavoriteIcon color={ shop.is_favourited ? 'error' : 'inherit' } />
        </IconButton>
        <Stack direction='row' marginLeft='auto'>
            <IconButton onClick={editShop} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteShop(shop.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Stack>
      </CardActions>
    </Card>
  );
}

export default ShopCard;