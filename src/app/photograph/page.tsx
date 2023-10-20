import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ProfileImageUpload() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const imageEditorRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleCrop = () => {
    if (imageEditorRef.current) {
      // Use the image cropping library's API to get the cropped image
      const croppedImage = imageEditorRef.current.getCroppedImage();
      setCroppedImage(croppedImage);
    }
  };

  return (
    <div>
      <h2>Profile Image Upload with Cropping (React)</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {image && (
        <div>
          <div>
            <img src={image} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>

          <label>Scale:</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={scale}
            onChange={handleScaleChange}
          />

          <div>
            <button onClick={handleCrop}>Crop and Save</button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div>
          <h3>Cropped Image Preview</h3>
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

      <AvatarEditor
        ref={imageEditorRef}
        image={image}
        width={200}
        height={200}
        border={10}
        color={[255, 255, 255, 0.6]}
        scale={scale}
      />
    </div>
  );
}

export default ProfileImageUpload;
