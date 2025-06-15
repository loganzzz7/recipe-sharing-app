import { Button, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Context';
import "./login.css";

let initialLoad = {
    react: { username: true, password1: true, password2: true },
    router: { username: true, password1: true, password2: true }
};

function Login() {

    const [ attempt, setAttempt ] = useState({ username: '', password: '' });
    const [ message, setMessage ] = useState('');
    const [ user, setUser ] = useContext(UserContext);

    const linkNavigation = useNavigate();

    const handleUsername = (e) => { setAttempt({ ...attempt, username: e.target.value }); }
    const handlePassword = (e) => { setAttempt({ ...attempt, password: e.target.value }); }

    const processLogin = () => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3456/UserRoutes/login', attempt).then((result) => {
            if (result.data == false) {
                setMessage('The username or password is incorrect!');
                return;
            } else {
                linkNavigation('/');
                setUser(attempt.username);
                sessionStorage.setItem('user', attempt.username);
                window.location.reload();
                return;
            }
        });
        // axios.post('http://localhost:3456/UserRoutes/signup', testMessage ).then( result => console.log(result) );
    };

    return (
        <>
            <div className='loginHeader'>
                <p> Login: </p>
            </div>
            <div className='loginForm'>
                <TextField
                    label="Username"
                    variant="outlined"
                    onChange={ (e) => handleUsername(e) }
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={ (e) => handlePassword(e) }
                />
                <Button
                    color='secondary'
                    variant="contained"
                    onClick={ processLogin }
                > Login </Button>
                <p variant="body1"> { message } </p>
            </div>
        </>
    )
}

export default Login;
