import { useAuthContext } from "../context/AuthContext";

const Login = () => {
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

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login