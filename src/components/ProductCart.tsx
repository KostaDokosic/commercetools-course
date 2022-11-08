import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '@commercetools/platform-sdk';
import { formatLocalizedString, getFormatedPrice, getProductMainImage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/static';
import { AddShoppingCart } from '@mui/icons-material';
import useCart from '../hooks/useCart';

interface Props {
  product: Product
}

export default function ProductCart({ product }: Props) {
  const navigate = useNavigate();
  const { addCartProduct } = useCart();

  const addItemToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addCartProduct(product);
  }

  return (
    <Card sx={{ maxWidth: 500, height: 'auto', cursor: 'pointer' }} onClick={() => navigate(`${ROUTES.PRODUCTS}/${product.id}`)}>
      <CardMedia
        component="img"
        alt="product"
        height="250"
        image={getProductMainImage(product)}

      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {formatLocalizedString(product.masterData.current.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatLocalizedString(product.masterData.current.description)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" variant='outlined' endIcon={<AddShoppingCart />} onClick={addItemToCart}>Add To Cart {getFormatedPrice(product)}</Button>
      </CardActions>
    </Card>
  );
}
