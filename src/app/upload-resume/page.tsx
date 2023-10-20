import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import className from './resume.module.css';

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the uploaded file, e.g., save it to state
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf', // Restrict to PDF files (you can change the file type)
    multiple: false,  // Allow only one file to be uploaded
  });

  const filePreview = useMemo(() => {
    if (selectedFile) {
      return (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>File Size: {selectedFile.size} bytes</p>
        </div>
      );
    } else {
      return null;
    }
  }, [selectedFile]);

  return (
    <div className='flex items-center justify-center mt-3'>
      <div {...getRootProps()} style={{border:'2px dashed #cccccc', width:'50%', padding:'40px', cursor:'pointer', textAlign:'center' }} className='hover:border-cyan-950 rounded-md flex items-center justify-center'>
      <div>
        <input {...getInputProps()} />
        <button style={{border:'2px solid #34aeeb', color:'#34aeeb', borderRadius:'24px', padding:'5px',paddingRight:'20px',paddingLeft:'20px', cursor:'pointer', textAlign:'center' }}>Upload resume</button>
       
        <p className="mt-2 text-gray-400">Attach as many files as you like, each file should not exceed 5mb</p>
      </div>
      </div>
     
      {filePreview}
    </div>
  );
};

export default ResumeUpload;
