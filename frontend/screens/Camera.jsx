// import React from 'react';
// import { View, ImageBackground } from 'react-native';
// import sea from "../assets/images/underwater.png"
// import tw from "twrnc"
// function Camera() {
//     return (
//         <>
//         <View style={tw `flex flex-1 items-center justify-center`}>
//         <ImageBackground source={sea} style={tw `w-full h-full absolute`}></ImageBackground>
//         </View>
//         </>
//     );
// }

// export default Camera;
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const CaptureAndSend = () => {
  const cameraRef = useRef(null);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      captureImage();
    }, 10000); // Capture every 10 seconds

    return () => clearInterval(captureInterval);
  }, []);

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });

      // Send the image to the Spring server
      sendImageToServer(photo.uri);
    }
  };

  const sendImageToServer = async (imageUri) => {
    // Configure your Spring server URL
    const serverUrl = 'YOUR_SPRING_SERVER_URL';
    
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await axios.post(serverUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      console.error('Camera permission not granted!');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        onCameraReady={handleCameraPermission}
      /> */}

      <TouchableOpacity onPress={captureImage}>
        <Text>Capture Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaptureAndSend;
