import React, { useState } from "react";
import "./ContentPost.css";
import imageIcon from "../Images/gallery.png";
import emojiIcon from "../Images/cat-face.png";
import { toast } from "react-hot-toast";
import videoIcon from "../Images/video.png";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
const ContentPost = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const accessToken = user.token;
  const [loading, setLoading] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const notifySuccess = msg => toast.success(msg)
  const notifyError = msg => toast.error(msg)
  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
      setTitle("")
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          if(progress !== 100){
            setLoading(true)
            let roundedPercentage = Math.round(progress).toFixed(2)
            setPercentage(roundedPercentage + "%")
          }
        },
        (error) => {
         notifyError("Something went wrong")
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`http://localhost:5000/api/post/create-post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: accessToken,
              },
              body: JSON.stringify({
                title,
                image: downloadURL,
              })
            }).then(data => {
              notifySuccess("Image Uploaded Successfully")
              window.location.reload()
          })
            
            setLoading(false)
          });
        }
      );
    } else if (fileTwo !== null) {
      setTitle("")
      const fileName = new Date().getTime() + fileTwo.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, fileTwo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          if(progress !== 100){
            setLoading(true)
            let roundedPercentage = Math.round(progress).toFixed(2)
            setPercentage(roundedPercentage + "%")
          }
        },
        (error) => {
          notifyError("Something went wrong")
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`http://localhost:5000/api/post/create-post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: accessToken,
              },
              body: JSON.stringify({
                title,
                video: downloadURL,
                image:""
              }),
            }).then(data => {
              notifySuccess("Video Uploaded Successfully")
              window.location.reload()
          })
         
            setLoading(false)
          });
        }
      );
    } else {
      fetch(`http://localhost:5000/api/post/create-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: accessToken,
        },
        body: JSON.stringify({
          title, 
        }),
      });
      setTitle("")
    }
  };
  return (
    <div>
      <div className="content-upload-container">
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <img src={`${user.other.profile}`} className="profile-image" alt="" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your real thought"
            type="text"
            className="content-input"
          />
        </div>
        
        <div
          style={{
            marginLeft: "10px",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          {
            imagePreview !== null ? <img src={`${imagePreview}`} className='preview-image' alt="preview" /> 
            : videoPreview !== null ? <video width="500" className="post-video"  height="500" controls>
            <source src={`${videoPreview}`} type="video/mp4" />
          </video>  : ""
          }
          
        <div>
          <div style={{display:"flex",marginTop: 25,}}>
        <label htmlFor="file">
            <img className="icons" src={`${imageIcon}`} alt="" />
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => [setFile(e.target.files[0]),setImagePreview(URL.createObjectURL(e.target.files[0]))]}
            />
          </label>
          <img className="icons" src={`${emojiIcon}`} alt="" />
          <label htmlFor="filetwo">
            <img className="icons" src={`${videoIcon}`} alt="" />
            <input
              type="file"
              name="filetwo"
              id="filetwo"
              onChange={(e) => [setFileTwo(e.target.files[0]),setVideoPreview(URL.createObjectURL(e.target.files[0]))]}
              style={{ display: "none" }}
            />
          </label>
          </div>
        </div>
        </div>
        <div style={{ marginTop: -43, display: "flex", justifyContent: "end" }}>
          <button onClick={handlePost} className="post-btn">
            {loading ? `Posting ${percentage}` : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentPost;
