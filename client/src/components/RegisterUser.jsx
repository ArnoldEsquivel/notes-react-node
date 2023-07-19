import { useState } from "react";
import './RegisterUser.scss'
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { TextField, IconButton, InputAdornment, Button, Alert } from '@mui/material';

const RegisterUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState({
        message: '',
        success: false
    })
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { login } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser()
    }

    const registerUser = async () => {
        console.log(user)
        await axios.post('/register', { user })
            .then(res => {
                console.log('data res',res.data)
                if (res.data) {
                    setAlert({
                        message: res.data.message,
                        success: res.data.success
                    })
                    let session = {
                        token: res.data.token,
                        user: res.data.user
                    }
                    login(session)
                } else {
                    setAlert({
                        message: 'Something went wrong',
                        success: false
                    })
                }
                setUser({
                    name: '',
                    email: '',
                    password: ''
                })
                setConfirmPassword('')
                setTimeout(() => {
                    resetAlert()
                }, 3000)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const resetAlert = () => {
        setAlert({
            message: '',
            success: false
        })
    }

    const handleChangeRegister = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="loginPageMainContainer">
            <Alert
                severity={alert.success ? 'success' : 'error'}
                sx={{ display: alert.message ? 'flex' : 'none' }}
                className='modalLoginAlert'
            >
                {alert.message}
            </Alert>
            <div className="loginFormMainContainer">
                <div className="loginFormCardContainer">
                    <form className='formStyle'>
                        <p>Name</p>
                        <TextField
                            id="name"
                            name="name"
                            placeholder="Jonh Doe"
                            type="text"
                            value={user.name}
                            onChange={handleChangeRegister}
                            fullWidth
                        />
                        <p>E-Mail</p>
                        <TextField
                            id="email"
                            name="email"
                            placeholder="jonh@doe.com"
                            type="email"
                            value={user.email}
                            onChange={handleChangeRegister}
                            fullWidth
                        />
                        <p>Password</p>
                        <TextField
                            id="password"
                            name="password"
                            placeholder="********"
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={handleChangeRegister}
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
                        <p>Confirm Password</p>
                        <TextField
                            id="passwordConfirm"
                            placeholder="********"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
    )
}

export default RegisterUser