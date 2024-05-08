import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EditDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({
    doctorID: '',
    name: { en: '', si: '' },
    description: { en: '', si: '' },
    time: 0,
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctor/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch doctor');
        }

        const data = await response.json();
        setDoctor(data);
        setCurrentImages(data.images); 
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleInputChange = (field, value) => {
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();


      formData.append('doctorID', doctor.doctorID);
      formData.append('nameEn', doctor.name.en);
      formData.append('nameSi', doctor.name.si);
      formData.append('descriptionEn', doctor.description.en);
      formData.append('descriptionSi', doctor.description.si);
      formData.append('time', doctor.time);


      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`http://localhost:5000/api/doctor/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }

      console.log('Doctor updated successfully');
    } catch (error) {
      console.error('Error updating doctor:', error.message);
    }
  };

  return (
    <div>
      {doctor ? (
        <div>
          <h2>Edit Doctor: {doctor.name.en}</h2>


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
          <input type="file" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} />

          {/* Edit doctor fields */}
          <label>Doctor ID:</label>
          <input
            type="text"
            value={doctor.doctorID}
            onChange={(e) => handleInputChange('doctorID', e.target.value)}
          />

          <label>Doctor Name (English):</label>
          <input
            type="text"
            value={doctor.name.en}
            onChange={(e) => handleInputChange('name', { ...doctor.name, en: e.target.value })}
          />

          <label>Doctor Name (Sinhala):</label>
          <input
            type="text"
            value={doctor.name.si}
            onChange={(e) => handleInputChange('name', { ...doctor.name, si: e.target.value })}
          />

          <label>Description (English):</label>
          <textarea
            value={doctor.description.en}
            onChange={(e) => handleInputChange('description', { ...doctor.description, en: e.target.value })}
          />

          <label>Description (Sinhala):</label>
          <textarea
            value={doctor.description.si}
            onChange={(e) => handleInputChange('description', { ...doctor.description, si: e.target.value })}
          />

          <label>Time:</label>
          <input
            type="number"
            value={doctor.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
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
