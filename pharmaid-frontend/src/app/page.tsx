'use client';

import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Autocomplete, TextField, Stack, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { SESSION_STORAGE_KEY } from "@/app/common/constants";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Patient } from "@/app/types";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatiens] = useState<Patient[]>([]);

  useEffect(() => {
    const token = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('/api/patients', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setIsLoading(false);
      setPatiens(response.data);
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      router.push('/login')
    })
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Typography sx={{ textAlign: 'center', marginBottom: 3 }} variant="h3">Emergency Aid</Typography>
      <Box>
        <Autocomplete
          options={patients}
          getOptionLabel={(patient: Patient) => `${patient.firstName} ${patient.lastName}`}
          getOptionDisabled={(patient: Patient) => !patient.pharmaId}
          onChange={(event, patient) => {
            console.log(patient);
            if (patient) {
              router.push(`/patient/${patient.id}`);
            }
          }}
          renderOption={(props, patient) => {
            return patient.pharmaId ?
              (
                <li {...props} key={patient.id}>
                  <Stack sx={{gap: 1}} direction="row" useFlexGap={true}>
                    {`${patient.firstName} ${patient.lastName}`}
                    <Tooltip title="PharmaId available">
                      <CheckCircleIcon sx={{fill: 'green'}}/>
                    </Tooltip>
                  </Stack>
                </li>
              ) :
              (
                <li {...props} key={patient.id}>
                  <Stack sx={{ gap: 1 }} direction="row" useFlexGap={true}>
                    {`${patient.firstName} ${patient.lastName}`}
                    <Tooltip title="PharmaId not available">
                      <CancelIcon sx={{ fill: 'darkred' }}/>
                    </Tooltip>
                  </Stack>
                </li>
              )
          }}
          renderInput={(params) =>
            <TextField
              {...params}
              fullWidth
              placeholder="Enter patient's name"
              label="Patients"
              variant="outlined"
            />
          }
        />
      </Box>
    </Container>
  );
}

