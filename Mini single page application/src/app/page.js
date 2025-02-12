/*
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

*/
'use client'
import React, { useState, useEffect } from 'react';
import {
  TextField, Select, MenuItem, FormControl, InputLabel, Button,
  Box, Typography, Container, Card, CardContent, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { 
  addDoc, 
  collection, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../app/assets/firebase/config';

const specialties = [
  'Cardiología',
  'Dermatología',
  'Pediatría',
  'Neurología',
  'Oftalmología',
  'Traumatología'
];

export default function AddAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    specialty: '',
    appointmentDate: '', 
    appointmentTime: '', 
  });

  const [patients, setPatients] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      const patientsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientData = {
        name: formData.name,
        age: Number(formData.age),
        specialty: formData.specialty,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime
      };

      await addDoc(collection(db, 'patients'), patientData);
      setFormData({
        name: '',
        age: '',
        specialty: '',
        appointmentDate: '',
        appointmentTime: ''
      });
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPatient(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const patientRef = doc(db, 'patients', editingPatient.id);
      const updateData = {
        name: editingPatient.name,
        age: Number(editingPatient.age),
        specialty: editingPatient.specialty,
        appointmentDate: editingPatient.appointmentDate,
        appointmentTime: editingPatient.appointmentTime
      };
      
      await updateDoc(patientRef, updateData);
      setOpenEditDialog(false);
      fetchPatients();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este registro?')) {
      try {
        await deleteDoc(doc(db, 'patients', id));
        fetchPatients();
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Nuevo Paciente
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Edad"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              margin="normal"
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Especialidad</InputLabel>
              <Select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                label="Especialidad"
                required
              >
                {specialties.map((specialty) => (
                  <MenuItem key={specialty} value={specialty}>
                    {specialty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Fecha"
              name="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Hora"
              name="appointmentTime"
              type="time"
              value={formData.appointmentTime}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Registrar Paciente
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.specialty}</TableCell>
                <TableCell>{patient.appointmentDate}</TableCell>
                <TableCell>{patient.appointmentTime}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(patient)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Paciente</DialogTitle>
        <DialogContent>
          {editingPatient && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Nombre Completo"
                name="name"
                value={editingPatient.name}
                onChange={handleEditChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Edad"
                name="age"
                type="number"
                value={editingPatient.age}
                onChange={handleEditChange}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Especialidad</InputLabel>
                <Select
                  name="specialty"
                  value={editingPatient.specialty}
                  onChange={handleEditChange}
                  label="Especialidad"
                  required
                >
                  {specialties.map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Fecha"
                name="appointmentDate"
                type="date"
                value={editingPatient.appointmentDate}
                onChange={handleEditChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Hora"
                name="appointmentTime"
                type="time"
                value={editingPatient.appointmentTime}
                onChange={handleEditChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}