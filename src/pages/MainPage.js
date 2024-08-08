import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';

const MainPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <ProductList />
            </main>
        </div>
    );
};

export default MainPage;
