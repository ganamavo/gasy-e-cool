import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
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
    category: string
}

interface ShopCardProps {
    shop: Shop;
    deleteShop: (id: number) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, deleteShop }) => {

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
        action={
          <IconButton onClick={() => null} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
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
          <strong>Facebook: </strong>{shop.facebook_link}
        </Typography>
        {shop.twitter_link && (
            <Typography variant='body2' color="text.secondary">
                <strong>Twitter: </strong>{shop.twitter_link}
            </Typography>
        )}
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

export default ShopCard;