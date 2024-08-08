import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct, addStock, removeStock } from '../services/api';

const StockManagement = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedvariant, setSelectedVariant] = useState('');
    const [selectedsubvariant, setSelectedSubVariant] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getProduct = async () => {
            try {
                const response = await fetchProduct(productId);
                setProduct(response.data);
            } catch (err) {
                setError('Error fetching product details');
            }
        };

    useEffect(() => {
        getProduct();
    }, [productId]);

    const handleAddStock = async () => {
        try {
            const data = {
                    "variant": selectedvariant,
                    "subvariant": selectedsubvariant,
                    "quantity": quantity
                }
            await addStock(productId,data);
            setSuccess('Stock added successfully');
            setError('');
            setQuantity('');
            getProduct();
        } catch (err) {
            setError('Error adding stock');
            setSuccess('');
        }
    };

    const handleRemoveStock = async () => {
        try {
            const data = {
                "variant": selectedvariant,
                "subvariant": selectedsubvariant,
                "quantity": quantity
            }
            await removeStock(productId, data);
            setSuccess('Stock removed successfully');
            setError('');
            setQuantity('');
            getProduct();
        } catch (err) {
            setError('Error removing stock');
            setSuccess('');
        }
    };

    if (!product) return <div>Loading...</div>;


    return (
        <div className="container mx-auto mt-8 mb-8">
            
            
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={product.ProductImage} alt="Sunset in the mountains"></img>
            <div className="px-6 py-4">
                <div className=" text-sm mb-2">Product ID : {product.ProductID}</div>
                <div className=" text-sm mb-2">Product Name : {product.ProductName}</div>
                <div className=" text-sm mb-2">Product Code : {product.ProductCode}</div>
                <div className=" text-sm mb-2">HSN Code : {product.HSNCode}</div>
                <div className=" text-sm mb-2">Total Stock : {product.TotalStock}</div>
                
                
            </div>
            
            </div>

            {/* Purchase / Sell Stock */}
            <div className="m-4 flex">
                <label className="block mb-2">Select Variant:</label>
                {product.variants.map(v => (
                <div key={v.id} value={v.name} onClick={()=> setSelectedVariant(v.name)} className={selectedvariant===v.name ? "flex items-center justify-center bg-slate-300 w-24 hover:bg-slate-300 shadow-md text-black font-bold px-8 py-8 mx-4 rounded-xl": "flex items-center justify-center bg-white w-24 hover:bg-slate-300 shadow-md text-black font-bold px-8 py-8 mx-4 rounded-xl"}>
                    {v.name}
                </div>
                ))}
            </div>
            {selectedvariant && (
                <div className="m-4 flex">
                <label className="block mb-2">Select Sub Variant:</label>
                
                {product.variants.map(vr => (
                    vr.name === selectedvariant ?
                    vr.subvariants.map(v => (
                        <div key={v.id} value={v.name} onClick={()=> setSelectedSubVariant(v.name)} className={selectedsubvariant===v.name ? "flex items-center justify-center bg-slate-300 w-24 hover:bg-slate-300 shadow-md text-black font-bold px-8 py-8 mx-4 rounded-xl": "flex items-center justify-center bg-white w-24 hover:bg-slate-300 shadow-md text-black font-bold px-8 py-8 mx-4 rounded-xl"}>
                    {v.name}
                </div>
                    )):""
                ))}
              
            </div>
            )}
            
            
            <div className="m-4 flex">
                <label className=" text-gray-700 mb-2">Quantity: </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-48 px-3 py-2 shadow-md border rounded-lg mx-5"
                    placeholder="Enter quantity"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <button
                onClick={handleAddStock}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
            >
                Purchase Stock
            </button>
            <button
                onClick={handleRemoveStock}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
                Sell Stock
            </button>
        </div>
    );
};

export default StockManagement;
