/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { Button, TextField } from "@mui/material";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import app from "../firebase";


function Edit() {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      middleName:"",
    },
  });
  const navigate =useNavigate()
  const { userId } = useParams();
  console.log(userId, "IDGET");
  // Simulate fetching data (you can replace this with an actual API call)
  useEffect(() => {
    // Replace this with your data fetching logic
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const mainData = data.filter((item) => item.id === userId)[0];
        console.log(mainData, "MAINDATA");
        // Set the form field values with the fetched data
        setValue("firstName", mainData.firstName);
        setValue("lastName", mainData.lastName);
        setValue("middleName", mainData.middleName);
        setValue("userName", mainData.userName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = (data) => {
const db = getFirestore(app);
const userDoc = doc(db, "users", userId);
updateDoc(userDoc, data)
  .then(() => {
 goBack()
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
  };

  const goBack=()=>{
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name:</label>
        <Controller
          name='firstName'
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
      </div>
      <div>
        <label>Middle Name:</label>
        <Controller
          name='middleName'
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <Controller
          name='lastName'
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
      </div>
      <div>
        <label>Email:</label>
        <Controller
          name='userName'
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
      </div>

      <Button variant='contained' color='primary' type='submit'>
        Submit
      </Button>
      <Button
        variant='contained'
        color='primary'
        type='button'
        onClick={() => goBack()}
      >Cancel
        {" "}
      </Button>
    </form>
  );
}
export default Edit;