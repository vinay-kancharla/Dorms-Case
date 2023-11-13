import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

const SignupModal = (props) => {

  const [signup] = useState(props.singup)

  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [passwordConfirmValue, SetPasswordConfirmValue] = useState("");
  const [emailValidator, setEmailValidator] = useState('');
  const [passwordValidator, setPasswordValidator] = useState('');
  const [passwordConfirmValidator, setPasswordConfirmValidator] = useState('');

  
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  // when hit validate button
  let validate = () => {
    let hasError = false;
    
    if (emailValue == '') {
        setEmailValidator("Email value must be filled in!")
        setEmailError(true);
        hasError = true;
    }

    if (passwordValue == '') {
        setPasswordValidator("Password value must be filled in!")
        setPasswordError(true);
        hasError = true;
    } else if (passwordValue != passwordConfirmValue) {
        setPasswordValidator("Password value must match with confirmed in!")
        setPasswordConfirmValidator("Password value must match with confirmed in!")
        setPasswordError(true);
        setPasswordConfirmError(true);
        hasError = true;
    }

    // if (!hasError) {
    //     props.parentCallback({
    //         action: 'submitted'
    //     });
    // }
    if (!hasError){
        handleSubmit()
    }  
}

const handleSubmit = async () => {
  
    const accountToBeCreated = {
        'email': emailValue,
        'password': passwordValue
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountToBeCreated),
      });
  
      if (response.ok) {
        const userIdentifier = await response.text();
        if (userIdentifier === 'null') {
            console.log('Failed to create account due to invalid credentials');
            toast.error('Account creation UNSUCCESSFUL');
        }
        else {
            console.log('Account created successfully');
            toast.success('Account creation successful!');
        }
        
      } else {
        console.log('Failed to create account');
        toast.error('Account creation UNSUCCESSFUL');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
         &nbsp; Sign Up
        </DialogTitle>
      }
      <form>
        <DialogContent>
          {/*input fields for title, description, deadline, and priority*/}
          {(
            <TextField
              label="Email"
              placeholder="Email"
              fullWidth
              error={emailError}
              helperText={emailValidator}
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
          <TextField
            aria-label="minimum height"
            minRows={3}
            label="confirm password"
            placeholder="Confirm password"
            error={passwordConfirmError}
            helperText={passwordConfirmValidator}
            fullWidth
            value={passwordConfirmValue}
            onChange={(e) => SetPasswordConfirmValue(e.target.value)}
          />
          <br /> <br />

        </DialogContent>
        <DialogActions>
            <Button
              onClick={validate}
              variant="contained"
              sx={{ bgcolor: 'primary.light', width: '50%' }}
            >
              &nbsp;Sign Up
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

export default SignupModal;
