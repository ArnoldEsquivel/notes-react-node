import { useState } from "react";
import './Login.scss'
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { TextField, IconButton, InputAdornment, Button, Alert } from '@mui/material';
import RegisterUser from "../components/RegisterUser";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { login } = useAuthContext()
    const session = {
        token: '1234567890',
        user: {
            id: 1,
            name: 'John Doe',
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(session)
    }

    const handleChangeLogin = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="loginMainContainer">
            <div className="loginPageMainContainer">
                <Alert
                    severity={alert.success ? 'success' : 'error'}
                    sx={{ display: alert.msg ? 'flex' : 'none' }}
                    className='modalLoginAlert'
                >
                    {alert.msg}
                </Alert>
                <div className="loginFormMainContainer">
                <h1 style={{margin: 0, color: "black"}}>Login</h1>
                    <div className="loginFormCardContainer">
                        <form className='formStyle'>
                            <p>E-Mail</p>
                            <TextField
                                id="emailLogin"
                                name="email"
                                placeholder="jonh@doe.com"
                                type="email"
                                value={user.email}
                                onChange={handleChangeLogin}
                                fullWidth
                            />
                            <p>Password</p>
                            <TextField
                                id="passwordLogin"
                                name="password"
                                placeholder="********"
                                type={showPassword ? 'text' : 'password'}
                                value={user.password}
                                onChange={handleChangeLogin}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {
                                                    showPassword
                                                        ? <AiOutlineEye className='iconPassword' />
                                                        : <AiOutlineEyeInvisible className='iconPassword' />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                className='loginButton'
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <RegisterUser />
        </div>
    )
}

export default Login