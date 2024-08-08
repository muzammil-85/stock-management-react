import React from 'react';
import Navbar from '../components/Navbar';
import StockManagement from '../components/StockManagement';

const StockManagementPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <StockManagement />
            </main>
        </div>
    );
};

export default StockManagementPage;
