import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Inventory System</Link>
                <div>
                    <Link to="/create" className="text-white m-4">Add Product</Link>
                    <Link to="/logout" className="text-white">Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
