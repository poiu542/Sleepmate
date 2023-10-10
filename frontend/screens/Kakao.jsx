import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import {WebView} from 'react-native-webview';
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';

function Kakao() {
    const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('CHECK!')`;
    const navigate = useNavigation();
    //우리의 배포된 웹사이트+
    return (
        <>
            <WebView 
                source={{uri : "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1e4417060773b8517915b413b7a1942d&redirect_uri=http://localhost:8080/api/oauth/kakao&scope=account_email,profile_nickname,gender,age_range" }}
                injectedJavascript = {INJECTED_JAVASCRIPT}
                onMessage={(e) => Alert.alert(e.nativeEvent.data)}
                >
            </WebView>

            {/* <View style={tw `absolute w-full px-10 py-170 z-10`}>
                <TouchableOpacity onPress={()=>{navigate.navigate("GoToSleep")}} style={tw `border-white border-[0.3] rounded-2 w-full h-13 items-center justify-center`}>
                    <Text style={tw `text-white text-lg`}>NEXT</Text>
                </TouchableOpacity>
            </View> */}
        </>
    );
}

export default Kakao;