import {Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import React, { useEffect, useState } from "react";
import { Video } from "expo-av";
import tw from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Webview} from 'react-native-webview';

const Home = () => {
    
    
    const navigate = useNavigation()
    let [showLogin, setShowLogin] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // Adjust the duration as needed
          useNativeDriver: true,
        }).start();
      };
    
      useEffect(() => {
        if (showLogin) {
          fadeIn();
        }
      }, [showLogin]);
    return(
        <>
        <Video style={tw `absolute top-0 left-0 bottom-0 right-0`}
            source={require("../assets/videos/home_video2.mp4")}
            resizeMode="cover"
            repeat={true}
            shouldPlay={true}
      />
            {
                showLogin?
                <>

                <View style={tw `flex-1 z-10`}>
                <Image
                    style = {tw `h-12 w-60 mt-60 self-center`}
                    source = {require('../assets/images/SleepMate.png')}
                ></Image>
                <Image
                    style = {tw `mt-3 w-65 h-5 self-center`}
                    source = {require('../assets/images/subtitle.png')}
                ></Image>
                </View>
                
                <View style={tw `flex-1 px-10 z-10`}>
                    {/* IntroExplain로 바꿔야 함 */}
                <TouchableOpacity onPress={()=>{navigate.navigate("MainTabNavigator")}} style={tw `bg-[#FFDC00]/70 rounded-2 h-13 items-center justify-center`}>
                    <Text style={tw `text-base`}><Ionicons style={tw `mt-3`} name="enter-outline" size={18} color="black" /> &nbsp; 카카오 로그인</Text>
                </TouchableOpacity>
                {/* <Webview 
                    style={tw `bg-[#FFDC00]/70 rounded-2 h-13 items-center justify-center`}
                    source={{uri : "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1e4417060773b8517915b413b7a1942d&redirect_uri=http://localhost:8080/api/oauth/kakao&scope=account_email,profile_nickname,gender,age_range"}}>
                    <Text style={tw `text-base`}><Ionicons style={tw `mt-3`} name="enter-outline" size={18} color="black" /> &nbsp; 카카오 로그인</Text>
                </Webview> */}
              
                {/* <TouchableOpacity onPress={()=>{navigate.navigate("MainTabNavigator")}} style={tw `bg-[#FFDC00]/70 rounded-2 h-13 items-center justify-center`}>
                    <Text style={tw `text-base`}><Ionicons style={tw `mt-3`} name="enter-outline" size={18} color="black" /> &nbsp; 홈으로</Text>
                </TouchableOpacity> */}
                </View>

                </>
                :
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
            <TouchableOpacity onPress={()=>{navigate.navigate("IntroExplain")}} style={tw `border-[#fff] border-[0.3] rounded-2 h-13 items-center justify-center`}>
                <Text style={tw `text-white text-lg`}>입장하기</Text>
            </TouchableOpacity>
            </View>
                </>
            
            }
            
            
      
            
        </>
    )
}

export default Home