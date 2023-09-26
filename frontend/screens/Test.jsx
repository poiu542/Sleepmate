import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import WebView from 'react-native-webview'
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';

function Test() {
    const navigate = useNavigation();
    //우리의 배포된 웹사이트+
    return (
        <>
            <WebView 
                source={{uri : "https://daen12.github.io/rtsp-camera/test.html" }}>
            </WebView>

            <View style={tw `absolute w-full px-10 py-170 z-10`}>
                <TouchableOpacity onPress={()=>{navigate.navigate("GoToSleep")}} style={tw `border-white border-[0.3] rounded-2 w-full h-13 items-center justify-center`}>
                    <Text style={tw `text-white text-lg`}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Test;