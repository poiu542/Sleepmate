import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import SleepTerm from '../components/DropDown/SleepTerm';
import HR from '../components/Html/HR';


// recoil
// import {useRecoilState} from "recoil";
// import {sceenNumberState} from '../recoil/intro/sceenNumberAtom';

// 컴포넌트
import ClockPicker from '../components/Clock/ClockPicker';
import Toggle from '../components/Button/Toggle';


const AlarmSetting = () => {


  return (
    <View style={tw`flex-1 bg-black w-full h-full`}>
      <ScrollView>

        <View style={tw`bg-black justify-center items-center mt-20 mb-20 w-full h-[800px]`}>
            <StatusBar style="light" />
            <View style={tw`absolute z-10 bg-[#323232] rounded-xl w-[350px] h-[100px] top-[5%]`}>
                <Toggle/>
            </View>

            <View style={tw`absolute bg-[#323232] rounded-xl w-[350px] h-[300px] mt-40 top-[3%]`}>
              <Text style={tw`flex-1 text-white p-8 text-5 font-black`}>기상 시간</Text>
              <View style={tw`flex-3 z-10 top-[0%] mt-5 w-[350px] h-full`}>
                  <ClockPicker display={4}/>
              </View>
            </View>

            {/* <Text style={tw `absolute mt-120 ml-25 text-white text-center text-white text-lg z-10`}>수면 예상 시간 8시간 30분</Text> */}
            
            {/* <View style={tw`absolute bg-[#323232] rounded-xl w-[350px] h-[350px] mt-120 top-[3%]`}>
              <Text style={tw`flex-1 text-white p-8 text-5 font-black`}>평균 수면 시간</Text>
              <View style={tw`flex-3 z-10 mt--30`}>
                <SleepTerm/>
              </View>
            </View> */}
        </View>
      </ScrollView>
      </View>
  );
};

export default AlarmSetting;
