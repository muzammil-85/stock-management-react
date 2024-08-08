import React from 'react';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';

const AddProductPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <ProductForm />
            </main>
        </div>
    );
};

export default AddProductPage;
