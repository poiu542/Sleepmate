import React from 'react';
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import candlebg from '../assets/images/candleBg.png'
import tw from 'twrnc';

const Home = () => {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={candlebg} style={styles.backgroundImage}>
      <>
                <View style={tw `flex-6 z-10`}>
                <Image
                    style = {tw `h-12 w-65 mt-60 ml-10`}
                    source = {require('../assets/images/SleepMate.png')}
                ></Image>
                <Image
                    style = {tw `mt-3 w-65 h-5 ml-10`}
                    source = {require('../assets/images/subtitle.png')}
                ></Image>
                </View>

            <View style={tw `flex-1 px-10 z-10`}>
            <TouchableOpacity onPress={()=>{navigate.navigate("MainTabNavigator")}} style={tw `border-[#fff] border-[0.3] rounded-2 h-13 items-center justify-center`}>
                <Text style={tw `text-white text-lg`}>입장하기</Text>
            </TouchableOpacity>
            </View>
                </>
      </ImageBackground>
    </View>
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

export default Home;
