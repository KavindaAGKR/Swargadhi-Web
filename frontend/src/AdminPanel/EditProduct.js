import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data); // Set product details in state
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      console.log('Product updated successfully');
      // Optionally, redirect to a success page or update UI
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>Edit Product: {product.itemNameEn}</h2>
          <label>Product Name (English):</label>
          <input
            type="text"
            value={product.itemNameEn}
            onChange={(e) => handleInputChange('itemNameEn', e.target.value)}
          />

          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />

          <label>Description (English):</label>
          <textarea
            value={product.descriptionEn}
            onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
          />

          {/* Add more input fields for other product details */}
          {/* Example: Quantity, Category, etc. */}

          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
