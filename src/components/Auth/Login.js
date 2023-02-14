import * as React from 'react' ;

import { 
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import { StyledButton, StyledPaper, StyledTextField } from 'src/shared/styled';

import {
    Label
} from './styled/Login.styled';

import SignUp from './SignUp';

import { validatorEmail, validatorPassword } from 'src/utils/helper/validateHelper';
import axios from 'axios';
import { backend_endpoint } from 'src/utils/static';
import { setCookie } from 'src/utils/helper/cookieHelper';
import swal from 'sweetalert';

const Login = (props) => {
    const {
        open,
        handleClose
    } = props ;

    const [email, setUserEmail] = React.useState('');
    const [password, setUserPassword] = React.useState('');

    const [openSignUp, setOpenSignUp] = React.useState(false);

    
    const handleOpenSignUp = () => { setOpenSignUp(true) }
    const handleCloseSignUp = () => { setOpenSignUp(false) }

    const clickSignIn = async () => {
        try {
            let res = await axios.post(`${backend_endpoint}auth/signin`, {
                email,
                password
            });
    
            setCookie('token', res.data.access_token);
    
            swal({
                title : "Success",
                text : "Sign In Successful",
                buttons : false,
                timer : 2000,
                icon : 'success'
            })
        } catch(err) {

        }
        handleClose() ;
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={StyledPaper}
                fullWidth
            >
                <DialogTitle>
                    Welcome to APTOS !
                </DialogTitle>
                <DialogContent>
                    <Label>
                        Email
                    </Label>
                    <StyledTextField 
                        value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
                        fullWidth
                        placeholder='Enter you email'
                        helperText={(!validatorEmail(email) && email) ? "Invalid email" : ""}
                    />
                    <div style={{marginBottom : 10}} />
                    <Label>
                        Password
                    </Label>
                    <StyledTextField
                        fullWidth 
                        value={password}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder='Enter your password'
                        helperText={(!validatorPassword(password) && password) ? "Password should be 8 characters" : ""}
                    />
                    <div style={{marginBottom : 10}} />
                    <Label>
                        Don't you have account? <span style={{
                            color: 'red', 
                            cursor : 'pointer',
                        }}
                        onClick={() => {
                            handleClose();
                            handleOpenSignUp();
                        }}
                        >Sign Up</span>
                    </Label>
                </DialogContent>
                <DialogActions>
                    <StyledButton
                        disabled={!validatorEmail(email) || !validatorPassword(password)}
                        onClick={() => clickSignIn()}
                    >
                        Login
                    </StyledButton>
                </DialogActions>
            </Dialog>
            <SignUp 
                open={openSignUp}
                handleClose={handleCloseSignUp}
            />
        </>
    )
}

export default Login ;