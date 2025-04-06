import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, loginSlice } from '../redux/slices/login.slice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loginSlice.selectors.selectIsLoginPending);
  const isSuccess = useSelector(loginSlice.selectors.selectIsLoginSuccess);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    const result = await dispatch(fetchLogin(values));
    const token = result?.payload?.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    setShowError(!token);
  };
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (showError) setShowError(false);
  }, [watchedEmail, watchedPassword]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

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
        Login
      </Typography>
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
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
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Box>
      {showError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Неверные данные. Проверьте email и пароль.
        </Alert>
      )}
    </Box>
  );
}

export default Login;
