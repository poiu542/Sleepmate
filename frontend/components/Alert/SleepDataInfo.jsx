import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, Animated} from 'react-native';
import tw from 'twrnc';

// 이미지
import star from '../../assets/star/star.png';

// 컴포넌트
import MotionChart from '../Chart/MotionChart';

const SleepDataInfo = () => {
    const score = [1,2,3];

    return (
        <View style={tw`w-full bg-[#000]/50 rounded-3 mt-5 p-5`}>

            {/* 시간 */}
            <Text style={tw`text-white text-4 text-center font-bold mt-2`}>나의 수면 시간</Text>
            <Text style={tw`text-[#FFF1D4] text-3.3 text-center mt-2`}>11:00PM - 07:30AM</Text>


            {/* 실제 잔 시간 */}
            <Text style={tw`text-white text-4 text-center font-bold items-center mt-2`}>4시간 30분</Text>


            {/* 차트 */}
            <MotionChart/>


            {/* 한줄평 */}
            <Text style={tw`text-[#ccc] text-sm text-center mt-5`}>수면시간이 부족해요. 점심시간에 쪽잠 어떠신가요?</Text>
        </View>
    )
}

export default SleepDataInfo;