import { StatusBar } from "expo-status-bar";
import {Text, View} from 'react-native';
import React from "react";
import { Video } from "expo-av";
import tw from "twrnc";


const IntroExplain = () => {
    return(
        <View style={tw`flex-1`}>
            <Video
                source={require("../assets/videos/walkingLoad.mp4")}
                resizeMode="contain"
                isLooping
            />
        </View>
    )
}

return IntroExplain;