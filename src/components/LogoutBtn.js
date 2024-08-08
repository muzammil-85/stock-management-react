import { useEffect } from 'react';
import { logout } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout();
                navigate('/'); 
                
            } catch (error) {
                console.error('Error:', error);
            }
        };
        handleLogout();
    }, [navigate]);
    
};

export default LogoutButton;
