import React, { useState } from 'react';
import { createProduct,updateImage } from '../services/api';

const ProductForm = () => {
    const [productID, setProductID] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [variants, setVariants] = useState([{ name: '', subvariants: [''] }]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleVariantChange = (index, value) => {
        const newVariants = [...variants];
        newVariants[index].name = value;
        setVariants(newVariants);
    };

    const handleSubVariantChange = (variantIndex, subVariantIndex, value) => {
        const newVariants = [...variants];
        newVariants[variantIndex].subvariants[subVariantIndex] = value;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { name: '', subvariants: [''] }]);
    };

    const addSubVariant = (variantIndex) => {
        const newVariants = [...variants];
        newVariants[variantIndex].subvariants.push('');
        setVariants(newVariants);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const convertToBase64 = (file) => {
        //     return new Promise((resolve, reject) => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file);
        //         reader.onload = () => resolve(reader.result);
        //         reader.onerror = (error) => reject(error);
        //     });
        // };

        // let base64Image = '';
        // if (productImage) {
        //     base64Image = await convertToBase64(productImage);
        // }
        const transformedVariants = variants.map(variant => ({
            name: variant.name,
            subvariants: variant.subvariants.map(subvariant => ({ name: subvariant }))
        }));

        const productData = {
            ProductID: productID,
            ProductCode: productCode,
            ProductName: productName,
            HSNCode: hsnCode,
            TotalStock: totalStock,
            variants: transformedVariants,
        };
        const formData = new FormData();
        formData.append('ProductImage', productImage);
        try {
            const productResponse = await createProduct(productData);
            if(productResponse.status === 201){
                await updateImage(productResponse.data.id, formData);
            }
            setSuccess('Product created successfully');
            setError('');
        } catch (err) {
            setError('Error creating product');
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto mt-8 mb-8">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block mb-2">Product ID:</label>
                    <input
                        type="number"
                        value={productID}
                        onChange={(e) => setProductID(e.target.value)}
                        className="w-full px-3 py-2 shadow-md border rounded-lg"
                        placeholder="Enter product ID"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Product Code:</label>
                    <input
                        type="text"
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                        className="w-full px-3 py-2 shadow-md border rounded-lg"
                        placeholder="Enter product code"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 shadow-md border rounded-lg"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Product Image:</label>
                    {imagePreview && (
                        <div className="mt-4">
                            <img src={imagePreview} alt="Product Preview" className="w-32 h-32 object-cover" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full border border-gray-200 shadow-md rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-non
                                file:bg-gray-50 file:border-0
                                file:me-4
                                file:py-3 file:px-4"
                        required
                    />
                    
                </div>
                <div className="mb-4">
                    <label className="block mb-2">HSN Code:</label>
                    <input
                        type="text"
                        value={hsnCode}
                        onChange={(e) => setHsnCode(e.target.value)}
                        className="w-full px-3 py-2 shadow-md border rounded-lg"
                        placeholder="Enter HSN code"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Total Stock:</label>
                    <input
                        type="number"
                        value={totalStock}
                        onChange={(e) => setTotalStock(e.target.value)}
                        className="w-full px-3 py-2 shadow-md border rounded-lg"
                        placeholder="Enter total stock"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Variants:</label>
                    {variants.map((variant, variantIndex) => (
                        <div key={variantIndex} className="mb-4">
                            <input
                                type="text"
                                value={variant.name}
                                onChange={(e) => handleVariantChange(variantIndex, e.target.value)}
                                className="w-full px-3 py-2 shadow-md border rounded-lg mb-2"
                                placeholder={`Variant ${variantIndex + 1} name`}
                                required
                            />
                            {variant.subvariants.map((subVariant, subVariantIndex) => (
                                <div key={subVariantIndex} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={subVariant}
                                        onChange={(e) => handleSubVariantChange(variantIndex, subVariantIndex, e.target.value)}
                                        className="w-full px-3 py-2 shadow-md border rounded-lg mr-2"
                                        placeholder={`Subvariant ${subVariantIndex + 1} name`}
                                        required
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addSubVariant(variantIndex)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Add Subvariant
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariant}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                        Add Variant
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
