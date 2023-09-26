// Login.tsx
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { auth } from '../firebase'; // Import Firebase authentication
import { useNavigate } from "react-router-dom";

const Signup = () => {
const navigate= useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


    const signIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
     navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <h1>Registeration Page</h1>
      <form>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          Create User
        </Button>
      </form>
    </div>
  );
};

export default Signup;
