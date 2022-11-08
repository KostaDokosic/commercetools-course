import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LoadingContext } from '../../context/LoadingContext';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddressDraft } from '@commercetools/platform-sdk';
import { setCartShippingAddress } from '../../services/address.service';
import { Button } from '@mui/material';

type AddressInfo = {
  country: string,
  streetName: string,
  firstName: string,
  lastName: string,
  state: string,
  postalCode: string,
  city: string,
  additionalStreetInfo: string,
}

export default function AddressForm() {
  const { setLoading } = useContext(LoadingContext)
  const { cart } = useContext(CartContext);
  const { register, handleSubmit, formState: { errors } } = useForm<AddressInfo>();

  const onSubmit: SubmitHandler<AddressInfo> = async (data) => {
    if (!cart) return;
    setLoading(true);
    const addressDraft: AddressDraft = { ...data, state: '' };
    await setCartShippingAddress(cart, addressDraft);
    setLoading(false);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('firstName', {
              required: 'First Name is required'
            })}
            helperText={errors.firstName ? errors.firstName.message : ''}
            label="First name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('lastName', {
              required: 'Last Name is required'
            })}
            helperText={errors.lastName ? errors.lastName.message : ''}
            label="Last name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('streetName', {
              required: 'Address is required'
            })}
            helperText={errors.streetName ? errors.streetName.message : ''}
            label="Address line 1"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('additionalStreetInfo', {
              required: 'Address is required'
            })}
            helperText={errors.additionalStreetInfo ? errors.additionalStreetInfo.message : ''}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('city', {
              required: 'City is required'
            })}
            helperText={errors.city ? errors.city.message : ''}
            label="City"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('state', {
              required: 'State is required'
            })}
            helperText={errors.state ? errors.state.message : ''}
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('postalCode', {
              required: 'First Name is required'
            })}
            helperText={errors.postalCode ? errors.postalCode.message : ''}
            label="Zip / Postal code"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('country', {
              required: 'Country is required'
            })}
            helperText={errors.country ? errors.country.message : ''}
            label="Country"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type='submit'
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Save Address
          </Button>
        </Grid>
      </Grid>
    </>
  );
}