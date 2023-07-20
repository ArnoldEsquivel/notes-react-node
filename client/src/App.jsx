import { lazy } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

const Login = lazy(() => import('./pages/Login'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const Notes = lazy(() => import('./pages/Notes'));

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path='/Private' element={<PrivateRoute />}>
            <Route index element={<Notes />} />
            {/* <Route path='/Private/Notes' element={<Notes />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
