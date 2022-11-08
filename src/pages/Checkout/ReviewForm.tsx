import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { formatLocalizedString, getLineItemPrice, getTotalPriceOfCart } from '../../utils/helper';
import { CustomerContext } from '../../context/CustomerContext';

export default function Review() {
  const { cart } = useContext(CartContext);
  const { customer } = useContext(CustomerContext);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart?.lineItems.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={formatLocalizedString(product.name)} secondary={`x${product.quantity}`} />
            <Typography variant="body2">{getLineItemPrice(product)}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cart && getTotalPriceOfCart(cart)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{customer?.firstName} {customer?.lastName}</Typography>
          <Typography gutterBottom>{cart?.billingAddress?.streetName}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          {/* <Grid container>
            {payments.map((payment) => (
              <key = {payment.name}>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.detail}</Typography>
            </Grid>
          </>
            ))} */}
        </Grid>
      </Grid>

    </>
  );
}