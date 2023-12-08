import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ aspect: 1 });

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleImageLoaded = (image) => {
    // Handle image loading if needed
  };

  const handleCropComplete = (crop, pixelCrop) => {
    onCropComplete(pixelCrop);
  };

  return (
    <ReactCrop
      src={imageSrc}
      crop={crop}
      onChange={handleCropChange}
      onImageLoaded={handleImageLoaded}
      onComplete={handleCropComplete}
    />
  );
};

export default ImageCrop;
