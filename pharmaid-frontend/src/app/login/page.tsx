'use client';

import { Box, TextField, Typography } from "@mui/material";
import React from 'react';
import axios from 'axios';
import { LoadingButton } from "@mui/lab";
import { useRouter } from 'next/navigation'
import { SESSION_STORAGE_KEY } from "@/app/common/constants";

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}
      onSubmit={async (e) => {
        e.preventDefault();
        const payload = {
          email,
          password,
        };

        try {
          setIsLoading(true);
          setErrorMessage(undefined);
          const { data }  = await axios.post('/api/login', payload);
          window.sessionStorage.setItem(SESSION_STORAGE_KEY, data.token);
          router.push('/');
        } catch (err) {
          /* eslint-disable @typescript-eslint/no-explicit-any */
          const errorMessage = (err as any).response.data;
          setIsLoading(false);
          setErrorMessage(errorMessage);
        }
      }}
    >
      <Typography variant="h4">Login</Typography>
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
      <LoadingButton loading={isLoading} type="submit" variant="contained">Login</LoadingButton>
    </Box>
  );
}