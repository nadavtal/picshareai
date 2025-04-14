import React, { useRef, useState, useEffect } from 'react';
import { uploadsServer } from '~/constants';

interface CameraProps {
  user: {
    id: string;
    email: string;
  };
}

const Camera: React.FC<CameraProps> = ({ user }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Request access to the front camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // 'user' for front camera, 'environment' for back camera
          },
        });

        // Set the video stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    startCamera();

    // Cleanup: Stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: {
  //         facingMode: 'user', // 'user' for front camera, 'environment' for back camera
  //       },
  //     });
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   } catch (err) {
  //     console.error("Error accessing the camera: ", err);
  //   }
  // };

  const takePicture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        setImages([...images, imageData]);
      }
    }
  };

  const uploadFiles = async () => {
    console.log("Uploading files", images);
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('subject', "New images sent");
    formData.append('text', "PicshareAi has sent you new images");
    formData.append('html', `<h3>HELLO </h3>`);
    formData.append('folderId', Date.now().toString());
    
    images.forEach((image, index) => {
      const byteString = atob(image.split(',')[1]);
      const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const size = blob.size;
      console.log(size)
      formData.append("files", blob, `image${index}.jpg`);
    });

    const response = await fetch(uploadsServer + "files/" + user.id, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log("Files uploaded successfully");
    } else {
      console.error("Error uploading files");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '500px' }}></video>
      </div>
      <button onClick={takePicture}>Take Picture</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
      <div>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px', display: 'inline-block' }}>
            <img src={image} alt={`Captured ${index}`} style={{ width: '100%', maxWidth: '150px' }} />
          </div>
        ))}
      </div>
      <button onClick={uploadFiles}>Send</button>
    </div>
  );
};

export default Camera;