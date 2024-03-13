import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const images = [
  'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQYALwFaLdWRO4aMfsfPYdnr2vD73VuUr0y1tTiFjYENDXf7XBEIqdYbX1TUPcNy44sYx1wMRrgSM6nBZM4QSU',
  'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRvC27D9KlxeEham1w-Wpd_pu3hd4A-OywxRbdnx9JFLpcTD7dfL0bD_WI6Ro8QkzrPLkBMzA9osrMpi4JSP5Y',
  'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSVby3wf1HYF5NReffKSwxLbZRENM0zRUaM97yz5OYBiJGgFHsq0aVo_iE7di8yzBEW4Z3eEjcR5avNEeF7xv4',
];


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
