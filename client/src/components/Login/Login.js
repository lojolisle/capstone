import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import {Grid, Paper, Avatar, TextField, Button, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'


import { login } from "../../redux/feature/authSlice";

const initialState = {
   email: "",
   password: ""
}

const Login = () => {
    const [loginFormValue, setLoginFormValue] = useState(initialState);
    const {email, password} = loginFormValue; 
    const dispatch = useDispatch();
    const navigate = useNavigate();

const paperStyle = {padding: 20, height: "70vh", width:280, margin:"20px auto"};
const avatarStyle={backgroundColor: 'green'}
const btnStyle={margin:'8px 0'};

const handleLoginSubmit = (e) => {
   e.preventDefault();
   if (email && password) {
      dispatch(login({ loginFormValue, navigate }));
    }
};
const onInputChange = (e) => {
   let {name, value} = e.target;
   setLoginFormValue({...loginFormValue, [name]: value});
   console.log(loginFormValue)
}

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
         <Grid align='center'>
            <Avatar style={avatarStyle}>
               <LockOutlinedIcon/>
            </Avatar>
            <h2>Sign In</h2>
         </Grid>
         
         <form onSubmit={handleLoginSubmit}>
            <TextField label="email" placeholder='Enter email' value={email} type="email" name="email" onChange={onInputChange}  fullWidth required/>
            <TextField label="password" placeholder='Enter password' value={password} type="password" name="password" onChange={onInputChange}  fullWidth required/>
            <Button type='submit' color='primary' variant='contained' style={btnStyle} fullWidth >Login</Button>
            <Typography>
               
               {/* <Link>Forgot Password?</Link> */}
            </Typography>
            {/* <Typography>Do you have an account? 
               <Link to="/register"  > Sign Up</Link>
            </Typography> */}
         </form>
      </Paper>
    </Grid>
  )
};

export default Login