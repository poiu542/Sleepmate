import {Text, View, Image, TouchableOpacity, Animated, StyleSheet, ImageBackground} from 'react-native';
import React, { useEffect, useState } from "react";
import { Video } from "expo-av";
import tw from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import candlebg from '../assets/images/candleBg.png'

const Sleep = () => {
    const navigate = useNavigation();


  return (
    <>
    <View style={styles.container}>
      <ImageBackground source={candlebg} style={styles.backgroundImage}>
      {/* <Video style={tw `absolute top-0 left-0 bottom-0 right-0 `}
            source={require("../assets/videos/home_video2.mp4")}
            resizeMode="cover"
            repeat={true}
            shouldPlay={true}
            isLooping={true}
        /> */}
            <View style={tw `flex-1 px-10 py-160 z-10`}>
                <TouchableOpacity onPress={()=>{navigate.navigate("Watch")}} style={tw `border-[#fff] border-[0.5] rounded-2 h-13 items-center justify-center`}>
                    <Text style={tw `text-white font-bold text-lg`}>자러 가기</Text>
                </TouchableOpacity>
            </View>
          </ImageBackground>
          </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    zIndex : -10,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});


export default Sleep;