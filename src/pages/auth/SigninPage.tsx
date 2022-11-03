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
import { CustomerSignin } from '@commercetools/platform-sdk';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../services/auth.service';
import { LoadingContext } from '../../context/LoadingContext';
import { CustomerContext } from '../../context/CustomerContext';
import useAuthGuard from '../../hooks/useAuthGuard';
import { ROUTES } from '../../utils/static';
import { useNavigate } from 'react-router-dom';

type ISignIn = {
  email: string;
  password: string;
}

export default function SignInPage() {
  useAuthGuard({ authProtection: false });

  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const { register, handleSubmit, formState: { errors } } = useForm<ISignIn>();
  const { setLoading } = useContext(LoadingContext)

  const { login } = useContext(CustomerContext);

  const { mutate, isLoading } = useMutation(signIn, {
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

  const onSubmit: SubmitHandler<ISignIn> = data => {
    const payload: CustomerSignin = { ...data };
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
                {...register('password', { required: 'Password is required' })}
                helperText={errors.password ? errors.password.message : ''}
                error={errors.password ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => navigate(ROUTES.REGISTER)}>
                Dont have account? Sign up
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