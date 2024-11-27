'use client';

import { Box, TextField, Typography } from "@mui/material";
import React from 'react';
import axios from 'axios';
import { LoadingButton } from "@mui/lab";
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async () => {
    const payload = {
      email,
      password,
    };

    try {
      setIsLoading(true);
      setErrorMessage(undefined);
      await axios.post('/api/register', payload);
      router.push('/login');
    } catch (err) {
      const errorMessage = err.response.data;
      setIsLoading(false);
      setErrorMessage(errorMessage);
    }
  }

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}
      onSubmit={async (e) => {
        e.preventDefault();
        await onSignup();
      }}
    >
      <Typography variant="h4">Sign Up</Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        onChange={event => setEmail(event.target.value)}
        value={email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        onChange={event => setPassword(event.target.value)}
        value={password}
      />
      { errorMessage && <Typography color="red" variant="body1">{errorMessage}</Typography>}
      <LoadingButton loading={isLoading} type="submit" variant="contained">Sign Up</LoadingButton>
    </Box>
  );
}