import {Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import React, { useEffect, useState } from "react";
import { Video } from "expo-av";
import tw from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Sleep = () => {
    const navigate = useNavigation();


  return (
    <View style={tw`flex-1`}>
      <Video style={tw `flex-1 `}
            source={require("../assets/videos/home_video2.mp4")}
            resizeMode="cover"
            isLooping={true}
            shouldPlay={true}
        >
            <View style={tw `flex-1 px-10 py-160 z-10`}>
                <TouchableOpacity onPress={()=>{navigate.navigate("Watch")}} style={tw `border-[#fff] border-[0.3] rounded-2 h-13 items-center justify-center`}>
                    <Text style={tw `text-white text-lg`}>Go to sleep</Text>
                </TouchableOpacity>
            </View>
        </Video>
    </View>
  );
};



export default Sleep;