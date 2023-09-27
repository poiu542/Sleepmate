import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';

// recoil
// import {useRecoilState} from "recoil";
// import {sceenNumberState} from '../recoil/intro/sceenNumberAtom';

// 컴포넌트
import ClockPicker from '../components/Clock/ClockPicker';
// import Toggle from '../components/Button/Toggle';


const AlarmSetting = () => {


  return (
    <View style={tw`flex-1 bg-[#11161A]`}>
        <StatusBar style="light" />
        
        <View style={tw`flex-4 z-10`}>
            <ClockPicker display={4}/>
            <Text style={tw `absolute mt-100 ml-25 text-white text-center text-white text-lg z-10`}>수면 예상 시간 8시간 30분</Text>
        </View>

        {/* <View style={tw`flex-2 z-10`}>
            <Toggle/>
        </View> */}

    </View>
  );
};

export default AlarmSetting;
