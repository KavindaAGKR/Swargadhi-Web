import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EditTreatment = () => {
  const { id } = useParams();
  const [treatment, setTreatment] = useState({
    treatmentName: { en: '', si: '' },
    price: 0,
    description: { en: '', si: '' },
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/treatment/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch treatment');
        }
        const data = await response.json();
        setTreatment(data);
        setCurrentImages(data.images); // Set current images in state
      } catch (error) {
        console.error('Error fetching treatment:', error);
      }
    };

    fetchTreatment();
  }, [id]);

  const handleInputChange = (field, value) => {
    setTreatment((prevTreatment) => ({
      ...prevTreatment,
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
      formData.append('treatmentNameEn', treatment.treatmentName.en);
      formData.append('treatmentNameSi', treatment.treatmentName.si);
      formData.append('price', treatment.price);
      formData.append('descriptionEn', treatment.description.en);
      formData.append('descriptionSi', treatment.description.si);

      // Append new image files
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`http://localhost:5000/api/treatment/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update treatment');
      }

      console.log('Treatment updated successfully');
    } catch (error) {
      console.error('Error updating treatment:', error.message);
    }
  };

  return (
    <div>
      {treatment ? (
        <div>
          <h2>Edit Treatment: {treatment.treatmentName.en}</h2>

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

          {/* Edit treatment fields */}
          <label>Treatment Name (English):</label>
          <input
            type="text"
            value={treatment.treatmentName.en}
            onChange={(e) => handleInputChange('treatmentName', { ...treatment.treatmentName, en: e.target.value })}
          />

          <label>Treatment Name (Sinhala):</label>
          <input
            type="text"
            value={treatment.treatmentName.si}
            onChange={(e) => handleInputChange('treatmentName', { ...treatment.treatmentName, si: e.target.value })}
          />

          <label>Price:</label>
          <input
            type="number"
            value={treatment.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />

          <label>Description (English):</label>
          <textarea
            value={treatment.description.en}
            onChange={(e) => handleInputChange('description', { ...treatment.description, en: e.target.value })}
          />

          <label>Description (Sinhala):</label>
          <textarea
            value={treatment.description.si}
            onChange={(e) => handleInputChange('description', { ...treatment.description, si: e.target.value })}
          />

          {/* Save changes button */}
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
