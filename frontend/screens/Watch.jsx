import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import { userSeq } from '../recoil/user/userAtom';
import { nonAuthHttp } from '../axios/axios';
// 이미지
import watchImg from '../assets/images/watchImg.png';

// 컴포넌트
import CheckAnimation from '../components/Animation/CheckAnimation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const Watch = () => {
   const [wait, setWait] = useState(true);
   const [connected, setConnected] = useState(false);
   const [memberSeq, setMemberSeq] = useRecoilState(userSeq);
   const intervalRef = useRef(null);
    const navigate = useNavigation();

    function getWatch(){
      async function requestWatch(){
          try {
              const response = await nonAuthHttp.get(`api/watch/sending/${memberSeq}`);
              console.log(response.data);
              setConnected(response.data.connection); //true/false
              if (response.data.connection) {
                clearInterval(intervalRef.current); // Stop the interval
                setWait(false);
                setTimeout(()=>{
                  navigate.navigate("Test")
                },1500)
              }
          } catch (error) {
              console.log(error);
          }
      }
      requestWatch()
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      getWatch();
    }, 1000);

    return () => {
      clearInterval(intervalRef.current); // Clear the interval on component unmount
    };
  }, []);

  useEffect(()=>{
    if(connected){
      setTimeout(()=>{
        navigate.navigate("Test")
      },3000)
    }
  },[wait])
 
    // useEffect(()=>{
    //   setTimeout(()=>{
    //     setWait(false);
    //     setTimeout(()=>{
    //       navigate.navigate("Test")
    //     },3000)
    //   },5000)
    // },[])

  return (
    <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-[#11161A]`}>
        <StatusBar style="light" />
        <CheckAnimation/>
  
        <Image source={watchImg} resizeMode="contain" style={tw`absolute top-35 left-2 right-0 bottom-0 w-70 h-70 ml-5 z-10`}></Image>
     
        <View style={tw `absolute top-120 left-0 right-0 bottom-0 px-10 z-10 w-full h-100`}>
          {
            wait?
            <Text style={tw`text-white self-center mt-20 text-5.2 mb-3 font-bold`}>워치 연결 대기중...</Text>
            :
            <Text style={tw`text-[#D2ECB7] self-center mt-20 text-lg mb-3 font-bold`}>워치 연결이 완료되었습니다!</Text>
          }
            <Text style={tw `text-center text-4.3 mb-5 text-white`}>{`갤럭시 워치가 없으신가요?\nSKIP 버튼을 눌러주세요`}</Text>
            <TouchableOpacity onPress={()=>{navigate.navigate("Test")}} style={tw `border-white border-[0.3] rounded-2 h-13 items-center justify-center`}>
                <Text style={tw `text-white text-lg`}>SKIP</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default Watch;
