import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../services/auth.service';
import { LoadingContext } from '../../context/LoadingContext';
import { CustomerContext } from '../../context/CustomerContext';
import useAuthGuard from '../../hooks/useAuthGuard';
import { ROUTES } from '../../utils/static';
import { useNavigate } from 'react-router-dom';

type ISignup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  useAuthGuard({ authProtection: false });

  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignup>();
  const { setLoading } = useContext(LoadingContext)

  const { login } = useContext(CustomerContext);

  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: data => {
      if (typeof data === 'string') {
        setServerError(data as string);
        return;
      }
      login(data.customer);
    },
    onError: (message: string) => {
      setServerError(message);
    }
  })

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading])

  const onSubmit: SubmitHandler<ISignup> = data => {
    const payload: CustomerDraft = { ...data };
    mutate(payload);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: '3rem' }}>
          Create your customer account
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                autoFocus
                type="text"
                {...register('firstName', { required: 'First name is required' })}
                helperText={errors.firstName ? errors.firstName.message : ''}
                error={errors.firstName ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                helperText={errors.lastName ? errors.lastName.message : ''}
                error={errors.lastName ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                {...register('email', {
                  required: 'Email is required', pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                helperText={errors.email ? errors.email.message : ''}
                error={errors.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 5, message: 'Password is too short' } })}
                helperText={errors.password ? errors.password.message : ''}
                error={errors.password ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                error={errors.confirmPassword ? true : false}
                {...register('confirmPassword', {
                  required: 'Password confirmation is required',
                  validate: (val: string) => {
                    return watch('password') !== val
                      ? 'Your passwords do no match'
                      : true;
                  },
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => navigate(ROUTES.LOGIN)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {serverError && <Grid container justifyContent="center" marginTop={4}>
            <Grid item>
              <Alert severity='error'>{serverError}</Alert>
            </Grid>
          </Grid>}
        </Box>
      </Box>
    </Container>
  );
}