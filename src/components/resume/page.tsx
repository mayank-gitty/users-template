// components/FileUpload.js
"use client";
import React from "react";
import useThemeContext from "@/context/context";

const Resume = () => {
  const { setFormData, formData }: any = useThemeContext();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // console.log("filiiiiiiiiiiiiiiiii", file.type);

    // Allowing file type
    var allowedTypes = [ 'application/pdf' ,"application/msword" ,"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ];

    if (!allowedTypes.includes(file.type)) {
      setFormData((prevData:any) => ({
        ...prevData,
        ["resume"]: ``,
      }));
      return  alert('Invalid file type. Please upload a  PDF file.');
      //  document.getElementById('fileInput').value = '';
    }

    console.log('below')

    const resumeData = new FormData();
    resumeData.append("file", file);

    try {
      const response = await fetch("/api/upload2", {
        method: "POST",
        body: resumeData,
      });

      console.log("res", response);

      if (response.ok) {
        console.log("File uploaded successfully.");

        setFormData((prevData) => ({
          ...prevData,
          ["resume"]: `files/${file.name}`,
        }));

        alert("resume uploaded successfully");
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
      alert("please upload from your pc directory");
    }
  };

  return (
    <div>
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <input type="file" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default Resume;
