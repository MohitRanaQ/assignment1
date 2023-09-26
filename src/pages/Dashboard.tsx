import  { useEffect, useState } from 'react';
import { Button, Card, TextField } from '@mui/material';
import {getFirestore,collection,getDocs,setDoc, deleteDoc , doc, addDoc } from'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserData {
     firstName: string;
  lastName: string; 
  middleName: string;
  password: string;
  userName: string;
  confirmPassword: string;
}

interface RowData {
  id:string,
     firstName: string;
  lastName: string; 
  middleName: string;
  password: string;
  userName: string;
  confirmPassword: string;
}

interface Column {
  field: keyof RowData;
  headerName: string;
}

import app from '../firebase';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
function DashboardPage() {
const navigate =useNavigate()

  const { control, handleSubmit,reset, formState: { errors } } = useForm<UserData>();

 const [alldata, setAllData] = useState([]);
const [reload,setReload] =useState(0)

  useEffect(() => {
    const fetchData = async () => {
 const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
      setAllData(data);
    };

    fetchData();
  }, [reload]);


console.log(alldata,"ALLDATA")


 const createDocument = async (userData:UserData) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'users');
  const {userName,password,lastName,firstName,middleName}=userData;
  const data = { userName,password,lastName,firstName,middleName};

  try {
    await addDoc(collectionRef, data);
    console.log('Document created successfully!');
    reset()
   setReload(prev=>prev+1)
  } catch (error) {
    console.error('Error creating document:', error);
  }
};



const columns = [
{ field: 'firstName', headerName: 'First Name', flex:1},
  { field: 'userName', headerName: 'User Name' , flex:1},
  {
      field: 'actions',
      headerName: 'Actions',
     flex:1,
      renderCell: (params: { row: RowData; column: Column }) => (
         <>
          <EditIcon
            onClick={() => {
    handleEdit(params.row);
  }}
            style={{ cursor: 'pointer', marginRight: 8 }}
          />
          <DeleteIcon
            onClick={() => handleDelete(params.row)}
            style={{ cursor: 'pointer' }}
          />
        </>
      ),
    },
];
  const handleEdit = (data) => {

navigate(`/edit/${data.id}`);
  
  };

  const handleDelete = (data) => {
    // Handle delete logic here
const db = getFirestore();
const usersCollection = collection(db, 'users');
const userDoc = doc(usersCollection, `${data.id}`);

deleteDoc(userDoc)
  .then(() => {
    console.log('Document successfully deleted!');
    setReload(prev=>prev+1)
  })
  .catch((error) => {
    console.error('Error removing document: ', error);
  });


  };

  return (
    <div>
      <form onSubmit={handleSubmit(createDocument)}>
        <div>
          {" "}
          <Controller
            name='firstName'
            control={control}
            defaultValue=''
            rules={{ required: true }} // Add any validation rules you need
            render={({ field }) => (
              <TextField
                label='First Name'
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName ? "First Name is required" : ""}
              />
            )}
          />
          <Controller
            name='middleName'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                label='Middle Name'
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name='lastName'
            control={control}
            defaultValue=''
            rules={{ required: true }} // Add any validation rules you need
            render={({ field }) => (
              <TextField
                label='Last Name'
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName ? "Last Name is required" : ""}
              />
            )}
          />
          <Controller
            name='userName'
            control={control}
            defaultValue=''
            rules={{ required: true }} // Add any validation rules you need
            render={({ field }) => (
              <TextField
                label='Email'
                type='email'
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.userName)}
                helperText={errors.userName ? "Email is required" : ""}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{ required: true }} // Add any validation rules you need
            render={({ field }) => (
              <TextField
                label='Password'
                type='password'
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.password)}
                helperText={errors.password ? "Password is required" : ""}
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            rules={{ required: true }} // Add any validation rules you need
            render={({ field }) => (
              <TextField
                label='Confirm Password'
                type='password'
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.confirmPassword)}
                helperText={
                  errors.confirmPassword ? "Confirm Password is required" : ""
                }
              />
            )}
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
        <Button
          variant='contained'
          color='primary'
          type='button'
          onClick={() => reset()}
        >
          clear
        </Button>
      </form>

      <Card sx={{ maxWidth: "100vw" }}>
        {" "}
        <DataGrid rows={alldata} columns={columns} pageSize={5} />
      </Card>
    </div>
  );
}

export default DashboardPage;
