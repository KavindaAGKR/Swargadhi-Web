import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

function ImageSlider({ images, imageSize, slideInterval }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(intervalId);
  }, [images, slideInterval]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-slider">
      <div className="image-container">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          style={{ width: imageSize, height: 'auto' }}
        />
        <button className="arrow-button prev" onClick={prevImage}>
          &#10094;
        </button>
        <button className="arrow-button next" onClick={nextImage}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

ImageSlider.defaultProps = {
  imageSize: '800px',
  slideInterval: 4000, 
};

export default ImageSlider;
