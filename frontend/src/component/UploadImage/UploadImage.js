import React, { Fragment, useState, useEffect, useRef } from "react";
import "./UploadImage.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadImageAction";
import MetaData from "../layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../../Images/image1.jpg"


const UploadImage = () => {
      const fileInputRef = useRef(null); // Create a ref for the input element
      const [image, setImage] = useState(null);
      const [imagePreview, setImagePreview] = useState('');
      const dispatch = useDispatch();
      const { user, isAuthenticated } = useSelector((state) => state.user);
      
      const handleFileChange = (e) => {

        const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagePreview(reader.result);
              setImage(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
      };
    
      const handleSubmit = async () => {
        if (!image) {
          alert('Please select an image');
          return;
        }
        const formData = new FormData();
        formData.set('image', image);
        formData.set('username', user._id);
        dispatch(uploadImage(formData));
        toast.success("Image uploaded successfully");
        handleClearImage();
      };
    
      const handleClearImage = () => {
        setImage(null);
        setImagePreview('');
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset input value to clear the selected file
        }
      };
   
    return (
    <Fragment>
        <Fragment>
            <MetaData title="Upload picture" />
            <div style={{display: "flex"}}>
                <div className="uploadImage" style={{width: "40%", borderRight: "1px solid #cccaca"}}>
                    <div className="uploadText">Upload picture</div>
                    <div className="box">
                        {!imagePreview && <input type="file" onChange={handleFileChange} ref={fileInputRef}/>}
                        {imagePreview && <img src={imagePreview} alt="Selected" style={{ width: '100%', height: '100%' }} />}
                    </div>
                    {imagePreview && <button onClick={handleClearImage} className='upload-btn'>Clear Image</button>}
                    <button className='upload-btn' onClick={handleSubmit}>Upload</button>
                </div>
                <div className="uploadImage">
                    <img src={Image} alt="Image" style={{height: "100%", width: "auto"}}/>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    </Fragment>
    );
};

export default UploadImage;