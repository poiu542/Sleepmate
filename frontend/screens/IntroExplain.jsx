import { StatusBar } from "expo-status-bar";
import {Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from "react";
import { Video } from "expo-av";
import tw from "twrnc";
import * as Animatable from 'react-native-animatable';


const IntroExplain = () => {

    const [animation1, setAnimation1] = useState(null);
    const [animation2, setAnimation2] = useState(null);
    const [animation3, setAnimation3] = useState(null);

    const height = Dimensions.get("window").height-150;

    useEffect(() => {
        if (animation1) animation1.slideInUp(1000); // 첫 번째 애니메이션
    }, [animation1]);

    return(
        <View style={tw`flex-1`}>
            
            <StatusBar hidden />

            <Video 
                style={tw`absolute top-0 left-0 right-0 bottom-0`}
                source={require("../assets/videos/walkingLoad.mp4")}
                resizeMode="cover"
                repeat={true}
                shouldPlay={true}
                isLooping={true}
            />
            <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40`}></View>
            <Animatable.View ref={(ref) => setAnimation1(ref)} style={tw`flex-1`}>
                <Text style={tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] ml-[40%]`}>환영합니다.</Text>
            </Animatable.View>
        </View>
    )
}

export default IntroExplain;