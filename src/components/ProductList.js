import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProducts();
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching products');
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-4">
                {products.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}/manage-stock`} className="hover:bg-slate-300">
                        <div  className="border rounded-lg p-4 shadow-md">
                            <img className="w-full h-32" src={product.ProductImage} alt={product.ProductName}></img>
                            <h3 className="text-xl font-bold">{product.ProductName}</h3>
                            <p>{product.ProductCode}</p>
                            <p>Stock: {product.TotalStock}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
