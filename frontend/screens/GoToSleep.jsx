import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Video, Audio } from "expo-av";
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

// recoil
import {useRecoilState} from "recoil";
import {sleepBackState} from '../recoil/sleepBack/sleepBackAtom';

// 음악
import volumeUp from '../assets/sounds/volumeUp.png';
import mute from '../assets/sounds/mute.png';

// 컴포넌트
import BackGroundPick from "../components/DropDown/BackGroundPick";

const GoToSleep = () => {
    const [back, setBack] = useRecoilState(sleepBackState);
    const navigate = useNavigation()

    const [sound, setSound] = useState(null);
    const [background, setBackground] = useState([
        { label: "starry night", value: 1 },
        { label: "rain", value: 2 },
    ]);

    //음악 재생
    async function playSound1() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/introMusic30.mp3')
                );
                setSound(sound);
                await sound.playAsync();
                console.log('Audio1 played successfully');
            } else {
                console.error('Audio1 permission not granted');
            }
        } catch (error) {
            console.error('Error playing audio1:', error);
        }
    }

    async function playSound2() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/rainMusic.mp3')
                );
                setSound(sound);
                await sound.playAsync();
                console.log('Audio2 played successfully');
            } else {
                console.error('Audio2 permission not granted');
            }
        } catch (error) {
            console.error('Error playing audio2:', error);
        }
    }

    async function stopSound1() {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setSound(null);
          console.log('Audio1 stopped successfully');
        }
    }

    async function stopSound2() {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setSound(null);
          console.log('Audio2 stopped successfully');
        }
    }

    const EndSleep = () => {
        stopSound1();
        stopSound2();
        navigate.navigate("SubTabNavigator");
    }


    const PlayMusic = () => {
        if(back===1){stopSound2(); playSound1();}
        else if(back===2){stopSound1(); playSound2();}
    }

    useEffect(()=>{
        console.log(back);
        //음악 처음 자동 시작
        if(back===1){stopSound2(); playSound1();}
        else if(back===2){stopSound1(); playSound2();}
    },[back])

    

    return(
        <View style={tw`flex-1`}>

            {
                back===1?<Video 
                    style={tw`absolute top-0 left-0 right-0 bottom-0`}
                    source={require("../assets/videos/sleeping_starry.mp4")}
                    resizeMode="cover"
                    repeat={true}
                    shouldPlay={true}
                    isLooping={true}
                />:<Video 
                    style={tw`absolute top-0 left-0 right-0 bottom-0`}
                    source={require("../assets/videos/sleeping_rain.mp4")}
                    resizeMode="cover"
                    repeat={true}
                    shouldPlay={true}
                    isLooping={true}
                />
            }

            {/* 배경 & 음악 선택 dropdown */}
            <View style={tw`absolute z-10 top-0 left-0 right-0 bottom-0 mt-20 w-70 h-5`}><BackGroundPick/></View>

            {/*  음악 관리 */}
            {   sound!=null?
                (back===1?
                    <TouchableOpacity style={tw`absolute top-0 left-80 right-0 bottom-0 mt-20 w-10 h-10 justify-center items-center z-10`} onPress={() => stopSound1()}><Image source={volumeUp} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
                    : <TouchableOpacity style={tw`absolute top-0 left-80 right-0 bottom-0 mt-20 w-10 h-10 justify-center items-center z-10`} onPress={() => stopSound2()}><Image source={volumeUp} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
                ):<TouchableOpacity style={tw`absolute top-0 left-80 right-0 bottom-0 mt-20 w-10 h-10 justify-center items-center z-10`} onPress={() => PlayMusic()}><Image source={mute} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
                    // <TouchableOpacity style={tw`absolute top-0 left-80 right-0 bottom-0 mt-20 w-10 h-10 justify-center items-center z-10`} onPress={() => stopSound1()}><Image source={volumeUp} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
                    // :
                    // <TouchableOpacity style={tw`absolute top-0 left-80 right-0 bottom-0 mt-20 w-10 h-10 justify-center items-center z-10`} onPress={() => playSound1()}><Image source={mute} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
            }
                <View style={tw`absolute mt-145 ml-[37%] w-full h-5 z-10`}> 
                    <View style={tw`bg-red-700 w-5 h-5 rounded-xl`}></View>
                    <Text style={tw`text-white ml-7 w-30 h-full mt--4`}>RECORD</Text>
                </View>
                
                <View style={tw `absolute px-10 w-full mt-160 z-10`}>
                        <TouchableOpacity onPress={()=>{EndSleep()}} style={tw `border-[#fff] border-[0.3] rounded-2 h-13 items-center justify-center`}>
                            <Text style={tw `text-white text-lg`}>wake up</Text>
                        </TouchableOpacity>
                </View>

         
        </View>
    )

}

export default GoToSleep