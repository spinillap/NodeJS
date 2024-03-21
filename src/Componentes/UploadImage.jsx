
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UploadImage = () =>{
  const [file, setFile] = useState(null);
  const {getRootProps, getInputProps} = useDropzone({
    accept:'image/jpeg, image/png',
    onDrop:(acceptedFiles)=>{
      setFile(acceptedFiles[0]);
  },                                                    
  })

  const handleSubmit = () =>
    {
    const formData = new FormData();
    formData.append('image', file);
    axios.post('https://api.example.com/upload', formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response)=>{
      console.log(response);
      })
      .catch((error)=>{
      console.error(error);
      });
  };
  return  (
    <div>
      <div {...getRootProps()} >
        <input {...getInputProps()} />
        <p>Arrastra una imagen aquí o haz clic para seleccionar una imagen</p>        
      </div>
      {file && (
        <div>
          <img src = {file.preview} alt="Imagen subida" />
          <button onClick={handleSubmit}>Subir imagen</button>
        </div>
      )}      
    </div>    
  );
};

export default UploadImage;