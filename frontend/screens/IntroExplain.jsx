import { StatusBar } from "expo-status-bar";
import {Text, View} from 'react-native';
import React from "react";
import { Video } from "expo-av";
import tw from "twrnc";


const IntroExplain = () => {
    return(
        <View style={tw`flex-1`}>
            <Video 
                style={tw`absolute top-0 left-0 right-0 bottom-0`}
                source={require("../assets/videos/walkingLoad.mp4")}
                resizeMode="cover"
                repeat={true}
                shouldPlay={true}
                isLooping={true}
            />
            <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30`}></View>
        </View>
    )
}

export default IntroExplain;