import { Alert, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ROUTES } from "../../utils/static";
import { useGetOrdersQuery } from "../../queries/orders.query";


export default function OrdersPage() {

  const {data: orders, isLoading} = useGetOrdersQuery();

  return orders && orders.length > 0 ? (
    <Grid container gap={4}>
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.createdAt}
                  </TableCell>
                  <TableCell align="left">{order.paymentState || 'Not Paid'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  ) : <Alert>You dont have any orders. Visit our <Link to={ROUTES.PRODUCTS}>shop page</Link> and purchase some products first.</Alert>
}
