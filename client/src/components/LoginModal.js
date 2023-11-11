import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

const LoginModal = (props) => {

  const [login] = useState(props.login)

  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  const [loginValidator, setLoginValidator] = useState('');
  const [passwordValidator, setPasswordValidator] = useState('');

  
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // when hit validate button
  let validate = () => {
    let hasError = false;
    
    if (emailValue === '') {
        setLoginValidator("Email value must be filled in!")
        setLoginError(true);
        hasError = true;
    }

    if (passwordValue === '') {
        setPasswordValidator("Password value must be filled in!")
        setPasswordError(true);
        hasError = true;
    }

    if (!hasError) {
        // props.parentCallback({
        //     action: 'submitted'
        // });
        handleSubmit()
        props.parentCallback({
          action: "account login successful"
      })
    }
}

const handleSubmit = async () => {
  
  const accountLogin = { emailValue, passwordValue};

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountLogin),
    });

    if (response.ok) {
      console.log('Account login successfully');
      toast.success('Account login successful!');
      props.parentCallback({
          action: "account login successful"
      })
      
    } else {
      console.log('Failed to login account');
      toast.error('Account login UNSUCCESSFUL');
      props.parentCallback({
          action: "account login unsuccessful"
      })
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  let signupClicked = () => {
    props.parentCallback({
      action: "signup"
    })
  }
  
    let cancel = () => {
        props.parentCallback({
            action: 'cancelled'
        });
    }
  return (
    <div>
      {/*Dialog*/}
      {
        <DialogTitle sx={{ bgcolor: 'primary.light', color: 'white' }}>
          &nbsp; Login
        </DialogTitle>
     }
      <form>
        <DialogContent>
          {/*input fields for title, description, deadline, and priority*/}
          {(
            <TextField
              label="Login"
              placeholder="Login"
              fullWidth
              error={loginError}
              helperText={loginValidator}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          )}
          <br /> <br />
          {/*Textfield for Description box*/}
          <TextField
            aria-label="minimum height"
            minRows={3}
            label="Password"
            placeholder="Password"
            error={passwordError}
            helperText={passwordValidator}
            fullWidth
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <br /> <br />

        </DialogContent>
        <DialogActions style={{ flexDirection: 'column', alignItems: 'flex-end', width: '100%'}}>
          <Button
              onClick={signupClicked}
              variant="contained"
              sx={{ bgcolor: 'primary.light' , width: '50%'}}
            >
              &nbsp;Sign Up!
            </Button>
            <br /> 
          <div style={{ width: '100%', display: 'flex' }}>
          <Button
              onClick={validate}
              variant="contained"
              sx={{ bgcolor: 'primary.light',width: '50%'}}
            >
              &nbsp;Login
            </Button>
            <Button
              onClick={cancel}
              variant="contained"
              sx={{ bgcolor: 'red',width: '50%' }}
            >
              &nbsp;Cancel
            </Button>
          </div>
        </DialogActions>
      </form>
    </div>
  );
}

export default LoginModal;
