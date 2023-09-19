import {Text, View, Typography} from 'react-native';
import React from "react";
import { Video } from "expo-av";
import tw from "twrnc";
import {useFonts, NovaSlim_400Regular } from '@expo-google-fonts/nova-slim'


const Home = () => {
    let [fontsLoaded] = useFonts({
        NovaSlim_400Regular ,
    })
    if(!fontsLoaded){
        return null
    }
    return(
        <View style={tw`flex-1`}>
            <Video style={tw `flex-1`}
                source={require("../assets/videos/home_video2.mp4")}
                resizeMode="cover"
                isLooping={true}
                shouldPlay={true}
            >
                <Text style={{ fontFamily: 'NovaSlim_400Regular ', fontSize: 40 }}>SleepMate</Text>
                <Typography></Typography>
            </Video>
        </View>
    )
}

export default {Home}