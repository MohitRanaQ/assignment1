import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from '@mui/material';

import {getFirestore,collection,getDocs} from'firebase/firestore';
import { useEffect, useState } from 'react';
import app from '../firebase';

interface FormData {
  email: string;
  password: string;
}


const Login = () => {
const { control, handleSubmit, formState: { errors } } = useForm<FormData>(); // Specify the FormData type here
  const navigate = useNavigate();
    const [alldata, setAllData] = useState([]);
  const [open, setOpen] = useState(false);



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
 const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setAllData(data);
    };

    fetchData();
  }, []);

  console.log(alldata,"DATAFROMFIREBASE")

  const signIn = async(data:FormData) => {

const filteredArray = alldata.filter(obj => obj.username === data.username && obj.password === data.password);
console.log(filteredArray,"THISIS LOGGED INDATA")
if(filteredArray.length>0){
  localStorage.setItem('user',JSON.stringify({email : filteredArray[0].userName,name:filteredArray[0].firstName}));
  navigate("/dashboard")
}
if(filteredArray.length===0){
setOpen(true)
}

  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(signIn)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }} // Add any validation rules you need
          render={({ field }) => (
            <TextField
              label="Email"
              value={field.value}
              onChange={field.onChange}
              error={Boolean(errors.email)}
              helperText={errors.email ? 'Email is required' : ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }} // Add any validation rules you need
          render={({ field }) => (
            <TextField
              label="Password"
              type="password"
              value={field.value}
              onChange={field.onChange}
              error={Boolean(errors.password)}
              helperText={errors.password ? 'Password is required' : ''}
            />
          )}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
      {open &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
  
  Incorrect Email or Password
  </Alert>
</Snackbar>}
    </div>
  );
};

export default Login;
