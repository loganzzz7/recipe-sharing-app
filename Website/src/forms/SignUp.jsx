import { Button, TextField, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./signup.css";

let initialLoad = {
    react: { username: true, password1: true, password2: true },
    router: { username: true, password1: true, password2: true }
};

function SignUp() {
    

    // const testMessage = { username: 'Edgar', password: '123' };
    // const [squares, setSquares] = useState(Array(9).fill(null));

    const [ attempt, setAttempt ] = useState({ username: '', password1: '', password2: '' });
    const [ message, setMessage ] = useState({ username: '', password1: '', password2: '' });
    const [ ready, setReady ] = useState({ username: false, password1: false, password2: false });

    // console.log("Component rendered");

    const linkNavigation = useNavigate();

    useEffect(function () {

        if (initialLoad.react.username == true) {
            initialLoad.react.username = false;
        } else if (initialLoad.router.username == true) {
            initialLoad.router.username = false;
        } else {

            const regex = new RegExp(/^[\w_\-]+$/);
            const match = regex.exec(attempt.username);

            if (match == null) {
                setMessage({ ...message, username: 'The username is invalid!' });
                setReady({ ...ready, username: false });
                return;
            }

            axios.post('http://localhost:3456/UserRoutes/lookup', { username: attempt.username }).then((result) => {
                if (result.data == true) {
                    setMessage({ ...message, username: 'The username is already being used!' });
                    setReady({ ...ready, username: false });
                    return;
                }
            });

            setMessage({ ...message, username: '' });
            setReady({ ...ready, username: true });
            
        }

    }, [ attempt.username ]);
    

    useEffect(function () {

        if (initialLoad.react.password1 == true) {
            initialLoad.react.password1 = false;
        } else if (initialLoad.router.password1 == true) {
            initialLoad.router.password1 = false;
        } else {

            const regex = new RegExp(/^[\w_\-]+$/);
            const match = regex.exec(attempt.password1);

            if (match == null) {
                setMessage({ ...message, password1: 'The password is invalid!' });
                setReady({ ...ready, password1: false });
                return;
            }

            setMessage({ ...message, password1: '' });
            setReady({ ...ready, password1: true });
            
        }

    }, [ attempt.password1 ]);
    

    useEffect(function () {

        if (initialLoad.react.password2 == true) {
            initialLoad.react.password2 = false;
        } else if (initialLoad.router.password2 == true) {
            initialLoad.router.password2 = false;
        } else {

            if (attempt.password1 != attempt.password2) {
                setMessage({ ...message, password2: 'The passwords don\'t match!' });
                setReady({ ...ready, password2: false });
                return;
            }

            setMessage({ ...message, password2: '' });
            setReady({ ...ready, password2: true });
            
        }

    }, [ attempt.password2 ]);
    

    const handleUsername = (e) => { setAttempt({ ...attempt, username: e.target.value }); }
    const handlePassword1 = (e) => { setAttempt({ ...attempt, password1: e.target.value }); }
    const handlePassword2 = (e) => { setAttempt({ ...attempt, password2: e.target.value }); }
    
    const processSignUp = () => {
        axios.post('http://localhost:3456/UserRoutes/signup', { username: attempt.username, password: attempt.password1 });
        // axios.post('http://localhost:3456/UserRoutes/signup', testMessage ).then( result => console.log(result) );
    };


    return (
        <>
            <div className='signUpHeader'>
                <p> SignUp: </p>
            </div>
            <div className='signUpForm'>
                <TextField
                    label="Username"
                    variant="outlined"
                    onChange={ (e) => handleUsername(e) }
                    helperText={ message.username }
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={ (e) => handlePassword1(e) }
                    helperText={ message.password1 }/>
                <TextField
                    label="Repeat your password"
                    variant="outlined"
                    type="password"
                    onChange={ (e) => handlePassword2(e) }
                    helperText={ message.password2 }
                />
                <Link onClick={ () => linkNavigation('/login') }>
                    <Button
                        color='secondary'
                        variant="contained"
                        onClick={ processSignUp }
                        disabled={ !(ready.username && ready.password1 && ready.password2) }
                    > Sign Up </Button>
                </Link>
            </div>
        </>
    )
}

export default SignUp;
