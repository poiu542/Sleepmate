import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, Animated} from 'react-native';
import tw from 'twrnc';

// 이미지
import star from '../../assets/star/star.png';

// 컴포넌트
import MotionChart from '../Chart/MotionChart';

// axios
import {nonAuthHttp} from '../../axios/axios';


const SleepDataInfo = ({selectedDate}) => {
    const score = [1,2,3];
    const [sleepTime, setSleepTime]=useState({
        "sleepTime": "02:34:10",
        "wakeUpTime": "02:36:30",
        "totalSleepTime": "00:02"
    });

    //axios 연결
    const axiosSleepTime = () => {
        const data = {
          "memberSeq": 1,
          "sleepDate": selectedDate
        }
        nonAuthHttp.post(`/api/video/comprehensive-data`, data)
        .then(response => {
            const result = response.data;
            console.log(result);
            if (result) {
                setSleepTime(result.result)
            }
        })
        .catch(error => {
            const err = error;
            console.log(err);
        });
      }
  
  
      useEffect(()=>{
        axiosSleepTime();
      },[])

    return (
        <View style={tw`w-full bg-[#000]/50 rounded-3 mt-5 p-5`}>

            {/* 시간 */}
            <Text style={tw`text-white text-4 text-center font-bold mt-2`}>나의 수면 시간</Text>
            <Text style={tw`text-[#FFF1D4] text-3.3 text-center mt-2`}>{sleepTime.sleepTime} - {sleepTime.wakeUpTime}</Text>


            {/* 실제 잔 시간 */}
            <Text style={tw`text-white text-4 text-center font-bold items-center mt-2`}>{sleepTime.totalSleepTime.split(":")[0]}시간 {sleepTime.totalSleepTime.split(":")[1]}분</Text>


            {/* 차트 */}
            <MotionChart/>


            {/* 한줄평 */}
            {   Number(sleepTime.totalSleepTime.split(":")[0])<7?
                <Text style={tw`text-[#ccc] text-sm text-center mt-5`}>
                    수면시간이 부족해요. 쉬는시간에 쪽잠 어떠신가요?
                </Text>:
                <Text style={tw`text-[#ccc] text-sm text-center mt-5`}>
                    충분한 휴식을 취하셨군요!
                </Text>
            }
        </View>
    )
}

export default SleepDataInfo;