import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginModal = (props) => {

  const [login] = useState(props.login)

  const [loginValue, setLoginValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  const [loginValidator, setLoginValidator] = useState('');
  const [passwordValidator, setPasswordValidator] = useState('');

  
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // when hit validate button
  let validate = () => {
    let hasError = false;
    
    if (loginValue == '') {
        setLoginValidator("Login value must be filled in!")
        setLoginError(true);
        hasError = true;
    }

    if (passwordValue == '') {
        setPasswordValidator("Password value must be filled in!")
        setPasswordError(true);
        hasError = true;
    }

    if (!hasError) {
        props.parentCallback({
            action: 'submitted'
        });
    }
}

    let cancel = () => {
        props.parentCallback({
            action: 'cancelled'
        });
    }
  return (
    <div>
      {/*Dialog*/}
      {login ? (
        <DialogTitle sx={{ bgcolor: 'primary.light', color: 'white' }}>
          &nbsp; Login
        </DialogTitle>
      ) : (
        <DialogTitle sx={{ bgcolor: 'primary.light', color: 'white' }}>
         &nbsp; Sign Up
        </DialogTitle>
      )}
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
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
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
        <DialogActions>
            <Button
              onClick={validate}
              variant="contained"
              sx={{ bgcolor: 'primary.light', width: '50%' }}
            >
              &nbsp;Login
            </Button>
            <Button
              onClick={cancel}
              variant="contained"
              sx={{ bgcolor: 'red', width: '50%' }}
            >
              &nbsp;Cancel
            </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default LoginModal;
