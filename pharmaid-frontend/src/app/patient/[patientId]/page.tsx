'use client';

import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SESSION_STORAGE_KEY } from "@/app/common/constants";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { format } from "date-fns";
import { Medication, MedicationEntry, Patient } from "@/app/types";

export default function PatientPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medications, setMedications] = useState([]);

  const rows: Medication[] = medications.map((entry: MedicationEntry) => ({
    id: entry.id,
    name: (entry.medication.medicationName as string),
    dosage: (entry.dosage as number),
    numOfDoses: (entry.numOfDoses as number),
    startDate: new Date(entry.startDate),
    endDate: entry.endDate ? new Date(entry.endDate) : null,
    isActive: (entry.isActive as boolean),
  }));

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
      console.log(response.data);
      const patients = response.data as Patient[];
      setPatient(patients.filter(patient => patient.id === patientId)[0]);

      axios.get(`/api/patients/${patientId}/pharmaid/view`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setMedications(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
      router.push('/login')
    })
  }, []);

  if (isLoading || !patient) {
    return <CircularProgress />;
  }

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4">{`${patient.firstName} ${patient.lastName}'s medications`}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Medication</TableCell>
              <TableCell align="right">Dosage&nbsp;(mg)</TableCell>
              <TableCell align="right">Doses Count</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Is Active?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.dosage}</TableCell>
                <TableCell>{row.numOfDoses}</TableCell>
                <TableCell>{format(row.startDate, 'LLL dd, yyyy')}</TableCell>
                <TableCell>{row.endDate ? format(row.endDate, 'LLL dd, yyyy') : 'No end date' }</TableCell>
                <TableCell>
                  {
                    row.isActive
                      ? <CheckCircleIcon sx={{ fill: 'green' }}/>
                      : <CancelIcon sx={{ fill: 'darkred' }}/>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}