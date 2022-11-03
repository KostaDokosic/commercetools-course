import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react"
import Payments from "../../components/Payments";
import ShippingAddressCreator from "../../components/ShippingAddressCreator";
import ShoppingList from "../../components/ShoppingList";
import { CustomerContext } from "../../context/CustomerContext"


export default function ProfilePage() {

  const { customer } = useContext(CustomerContext);

  return (
    <>
      <h1>Welcome {customer?.firstName} {customer?.lastName}</h1>
      <Grid container gap={2}>
        <Grid item>
          <TextField label='First Name' variant="outlined" value={customer?.firstName} disabled />
        </Grid>
        <Grid item>
          <TextField label='Last Name' variant="outlined" value={customer?.lastName} disabled />
        </Grid>
        <Grid item>
          <TextField label='Email address' variant="outlined" value={customer?.email} disabled />
        </Grid>
      </Grid>

      {/* TODO: */}
      <Box sx={{ marginTop: 5 }}>
        <ShippingAddressCreator />
      </Box>

      {/* TODO: */}
      <Box sx={{ marginTop: 5 }}>
        <ShoppingList />
      </Box>

      {/* TODO: */}
      <Box sx={{ marginTop: 5 }}>
        <Payments />
      </Box>
    </>
  )
}
