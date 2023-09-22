import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

function Test() {
    //우리의 배포된 웹사이트
    return (
        <WebView 
            source={{uri : "https://daen12.github.io/rtsp-camera/test.html" }}>
        </WebView>
    );
}

export default Test;