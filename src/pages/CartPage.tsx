import { Alert, Button, Grid } from "@mui/material";
import { useContext } from "react"
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"
import { formatLocalizedString, getLineItemColor, formatLineItemPrice, getLineItemSize, getProductSizes, getLineItemPrice, getTotalPriceOfCart } from "../utils/helper";
import { ROUTES } from "../utils/static";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CartPage() {
  const { cart } = useContext(CartContext);

  return cart && cart.lineItems.length > 0 ? (
    <Grid container gap={4}>
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.lineItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formatLocalizedString(item.name)}
                  </TableCell>
                  <TableCell align="right">{formatLineItemPrice(item)}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item sx={{ border: '1px solid #3e3e3c25 ', padding: '1rem ' }}>
        <p>Total price: {getTotalPriceOfCart(cart)} EUR</p>
        <Button type="button" variant="contained"><Link to={ROUTES.CHECKOUT}>CHECKOUT</Link></Button>
      </Grid>
    </Grid>
  ) : <Alert>Cart is empty. Visit our <Link to={ROUTES.PRODUCTS}>shop page</Link> and add products to cart.</Alert>
}
