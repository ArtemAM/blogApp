import React, { useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegister, registerSlice } from '../redux/slices/register.slice';
import { loginSlice } from '../redux/slices/login.slice';

function Register() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(registerSlice.selectors.selectIsFetchPending);
  const isAuth = useSelector(loginSlice.selectors.selectIsAuth);
  const error = useSelector(registerSlice.selectors.selectError);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (values) => {
    dispath(fetchRegister(values));
  };

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  return (
    <Box
      sx={{
        margin: '0 auto',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
      }}
    >
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 3 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="Full Name"
          name="fullName"
          autoComplete="name"
          autoFocus
          {...register('fullName', {
            required: 'Full Name is required',
          })}
          error={!!errors.fullName}
          helperText={errors.fullName ? errors.fullName.message : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          {isLoading ? 'Registration...' : 'Register'}
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
