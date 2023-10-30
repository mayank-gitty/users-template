// components/FileUpload.js
"use client"
import React from 'react';

const FileUpload = () => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload2', {
        method: 'POST',
        body: formData,
      });

      console.log('res',response)

      if (response.ok) {
        console.log('File uploaded successfully.');
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('An error occurred while uploading the file:', error);
      alert('please upload from your pc directory')
    }
  };

  return (
    <div>
      <p>hello</p>
      <input type="file" onChange={handleFileUpload} />

    </div>
  );
};

export default FileUpload;
