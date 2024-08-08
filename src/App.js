import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import MainPage from './pages/MainPage';
import StockManagementPage from './pages/StockManagePage';
import LogoutButton from './components/LogoutBtn';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                  <Route path="/home" element={<MainPage />} />
                  <Route path="/" element={<Login />} />
                    <Route path="/create" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
                    <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
                    <Route path="/products/:productId/manage-stock" element={<StockManagementPage />} />
                    <Route path="/logout" element={<PrivateRoute><LogoutButton /></PrivateRoute>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
