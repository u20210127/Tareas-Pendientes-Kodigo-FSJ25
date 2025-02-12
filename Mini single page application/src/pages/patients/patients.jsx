import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  doc 
} from 'firebase/firestore';
import { db } from '../../app/assets/firebase/config';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Obtener todos
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      setTodos(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    fetchTodos();
  }, []);

  // Agregar todo
  const onSubmit = async (data) => {
    if (editing) {
      await updateDoc(doc(db, 'todos', editing.id), data);
      setEditing(null);
    } else {
      await addDoc(collection(db, 'todos'), data);
    }
    reset();
    // Recargar todos
  };

  // Eliminar todo
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    // Recargar todos
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Tarea"
          {...register('title')}
          defaultValue={editing?.title}
          margin="normal"
        />
        <Button 
          type="submit" 
          variant="contained"
          sx={{ mt: 1 }}
        >
          {editing ? 'Actualizar' : 'Agregar'} Tarea
        </Button>
      </form>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                onClick={() => setEditing(todo)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                onClick={() => handleDelete(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}