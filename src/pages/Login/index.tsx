/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./login.css";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CusBtn from "../../Components/CusBtn/index";
import { useNavigate, Link } from "react-router-dom";
import CusInput from "../../Components/CusInput/index";

import { Snackbar, Alert } from "@mui/material";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../firebase";
interface FormData {
  email: string;
  password: string;
}


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [alldata, setAllData] = useState([]);
  const [open, setOpen] = useState(false);


    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "users"));
       const data = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));
      setAllData(data);
    };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  useEffect(() => {
    document.title = `Login Page | Interview Assignment`;
    fetchData();
  }, [navigate]);

  console.log(alldata, "ALLDATA");

  const signIn = async (e) => {
    e.preventDefault()
    console.log(email,password,"TEST")
    const filteredArray = alldata.filter(
      (obj) => obj.userName === email && obj.password === password
    );
    console.log(filteredArray, "THISIS LOGGED INDATA");
    if (filteredArray.length > 0) {
      localStorage.setItem("userName", filteredArray[0].userName);
      localStorage.setItem("name", filteredArray[0].firstName);
      localStorage.setItem("userId", filteredArray[0].id);
      navigate("/dashboard");
    }
    if (filteredArray.length === 0) {
      setOpen(true);
    }
  };

  return (
    <div className='loginPage'>
      <div className='sectionCon'>
        <section className='infoLeft'>
          <div className='headingCon'>
            <h1>Welcome</h1>
            <h2>to online help center!</h2>
          </div>

          <div className='highlightsCon'>
            <span>
              <DoneIcon />
              Secure and reliable for user
            </span>
            <span>
              <DoneIcon />
              Even your grandma can use it
            </span>
            <span>
              <DoneIcon />
              Work 15% faster than others
            </span>
          </div>
        </section>

        <section className='formRight'>
          <form>
            <CusInput
              name='email'
              fldType='email'
              label='E-mail'
              value={email}
              onchange={(event) => setEmail(event.target.value)}
              className='emailInpFld'
            />
            <CusInput
              name='password'
              fldType='password'
              label='Password'
              value={password}
              onchange={(event) => setPassword(event.target.value)}
              className='passInpFld'
            />
            <CusBtn className='cusLoginBtn' onClick={(e) => signIn(e)}>
              Login
            </CusBtn>
          </form>
        </section>
        <div className='dontHaveAccount'>
          Dont have an account? <Link>Contact us</Link>
        </div>
      </div>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
            Incorrect Email or Password
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Login;
