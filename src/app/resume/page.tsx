"use client";
import { useState } from "react";
import useThemeContext from "@/context/context";

export default function PhotoUpload(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const { setFormData, formData , } = useThemeContext();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    console.log("image-file111111", image.name);
    body.append("image-file1", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    // console.log('mk',response)

    if (response.ok) {
      alert("uploaded succesfully");

      setFormData((prevData) => ({
        ...prevData,
        ["photograph"]: `uploads/${image?.name}`, 
      }));
    }
  };

  return (
    <div>
      <div>

        <div className="profile-upload">
                             <img src={createObjectURL || formData.photograph } />  
        </div>

        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          upload
        </button>
      </div>
    </div>
  );
}
