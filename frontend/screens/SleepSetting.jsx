import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

// recoil
// import {useRecoilState} from "recoil";
// import {sceenNumberState} from '../recoil/intro/sceenNumberAtom';

// 컴포넌트
import ClockPicker from '../components/Clock/ClockPicker';


const SleepSetting = () => {

  const navigate = useNavigation();


  return (
    <View style={tw`flex-1 bg-[#11161A]`}>
        <StatusBar style="light" />
        
        <View style={tw`flex-4 z-10 p-5`}>
          <Text style={tw `text-white text-lg font-bold mt-40`}>{`나의 설정페이지 입니다.`}</Text>

          <TouchableOpacity onPress={()=>{navigate.navigate("AlarmSetting")}} style={tw `flex-row border-white border-[0.3] rounded-2 h-17 items-center mt-15 bg-white`}>
              <Ionicons name="alarm" size={30} color="#11161A" style={tw`p-5 mt--1`}/>
              <Text style={tw `text-[#11161A] text-lg p-1`}>알람 설정</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigate.navigate("UserSetting")}} style={tw `flex-row border-white border-[0.3] rounded-2 h-17 items-center mt-5 bg-white`}>
              <Ionicons name="person" size={30} color="#11161A" style={tw`p-5 mt--1`}/>
              <Text style={tw `text-[#11161A] text-lg p-1`}>회원 정보</Text>
          </TouchableOpacity>

        </View>



      <View style={tw `flex-1 px-10 z-10`}>
            <TouchableOpacity onPress={()=>{navigate.navigate("Home")}} style={tw `border-white border-[0.3] rounded-2 h-13 items-center justify-center`}>
                <Text style={tw `text-white text-lg`}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default SleepSetting;
