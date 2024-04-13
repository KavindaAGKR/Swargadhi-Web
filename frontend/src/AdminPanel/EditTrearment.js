import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EditTreatment = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    itemName: { en: '', si: '' },
    description: { en: '', si: '' },
    category: { en: '', si: '' },
    productItemID: '',
    price: 0,
    quantity: 0,
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setCurrentImages(data.images); // Set current images in state
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (field, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      // Append flat fields
      formData.append('productItemID', product.productItemID);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);

      // Append nested fields (stringified)
      formData.append('itemNameEn', product.itemName.en);
      formData.append('itemNameSi', product.itemName.si);
      formData.append('descriptionEn', product.description.en);
      formData.append('descriptionSi', product.description.si);
      formData.append('categoryEn', product.category.en);
      formData.append('categorySi', product.category.si);

      // Append new image files
      imageFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const response = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };


  return (
    <div>
      {product ? (
        <div>
          <h2>Edit Product: {product.itemName.en}</h2>

          {/* Display current images */}
          <div>
            <h3>Current Images:</h3>
            {currentImages.map((imageUrl, index) => (
              <img
                key={index}
                src={`http://localhost:5000${imageUrl}`}
                alt={`Image ${index}`}
                style={{ width: '150px', height: '150px', marginRight: '10px' }}
              />
            ))}
          </div>

          {/* Upload new images */}
          <label>Upload New Image:</label>
          <input type="file" multiple onChange={handleImageUpload} />

          {/* Display new image previews */}
          {imageFiles.length > 0 && (
            <div>
              <h3>New Image Preview:</h3>
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`New Image ${index}`}
                  style={{ width: '150px', height: '150px', marginRight: '10px' }}
                />
              ))}
            </div>
          )}

          {/* Edit product fields */}
          <label>Product Item ID:</label>
          <input
            type="text"
            value={product.productItemID}
            onChange={(e) => handleInputChange('productItemID', e.target.value)}
          />

          <label>Product Name (English):</label>
          <input
            type="text"
            value={product.itemName.en}
            onChange={(e) => handleInputChange('itemName', { ...product.itemName, en: e.target.value })}
          />

          <label>Product Name (Sinhala):</label>
          <input
            type="text"
            value={product.itemName.si}
            onChange={(e) => handleInputChange('itemName', { ...product.itemName, si: e.target.value })}
          />

          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />

          <label>Description (English):</label>
          <textarea
            value={product.description.en}
            onChange={(e) => handleInputChange('description', { ...product.description, en: e.target.value })}
          />

          <label>Description (Sinhala):</label>
          <textarea
            value={product.description.si}
            onChange={(e) => handleInputChange('description', { ...product.description, si: e.target.value })}
          />

          <label>Quantity:</label>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
          />

<label>Category (English):</label>
          <select value={product.category.en} onChange={(e) => handleInputChange('category', { ...product.category, en: e.target.value })}>
            <option value="kalka">Kalka</option>
            <option value="Paththu">Paththu</option>
            <option value="Guli">Guli</option>
            <option value="Thel">Thel</option>
            <option value="Chuurna">Chuurna</option>
            <option value="Kashay">Kashay</option>
          </select>

          {/* Dropdown for Category (Sinhala) */}
          <label>Category (Sinhala):</label>
          <select value={product.category.si} onChange={(e) => handleInputChange('category', { ...product.category, si: e.target.value })}>
            <option value="කල්ක<">කල්ක</option>
            <option value="පත්තු">පත්තු</option>
            <option value="ගුලි">ගුලි</option>
            <option value="තෙල්">තෙල්</option>
            <option value="චූර්න">චූර්න</option>
            <option value="කසාය">කසාය</option>
          </select>
          {/* Save changes button */}
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
