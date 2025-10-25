import {Navigate} from 'react-router-dom';
import {getAuth} from './authService';

export default function UserProtectedRoute({children}) {
    const a = getAuth();
    return a && a.token ? children : <Navigate to="/login" />;
}
