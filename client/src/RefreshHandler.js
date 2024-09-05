import React ,{useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup') {
                navigate('/', { replace: false });
            }
        }
    }, [location.pathname, setIsAuthenticated, navigate]);

    return null;
}

export default RefreshHandler;