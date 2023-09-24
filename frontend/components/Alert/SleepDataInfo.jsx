import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, Animated} from 'react-native';
import tw from 'twrnc';

// 이미지
import star from '../../assets/star/star.png';

const SleepDataInfo = () => {
    const score = [1,2,3];

    return (
        <View style={tw`w-full h-[210px] bg-[#091B35] rounded-lg mt-5`}>
            
            {/* 별 점수 */}
            <View style={tw`flex-row mt-5 items-center justify-center`}>
                {
                    score.map(()=>{
                        return(
                            <Image style={tw`w-7 h-7 mr-3`} source={star}/>
                        )
                    })
                }
            </View>

            {/* 시간 */}
            <Text style={tw`text-white text-lg text-center mt-5 font-bold`}>5월 24일 11:00PM ~ 07:30AM</Text>

            {/* 잠자는데 걸리는 시간 */}
            <View style={tw`flex-row mt-5 items-center justify-between pl-7 pr-7`}>
                <Text style={tw`text-white text-lg text-center font-bold`}>잠드는 데 걸린 시간</Text>
                <Text style={tw`text-white text-lg text-center font-bold`}>15분</Text>
            </View>

            {/* 실제 잔 시간 */}
            <View style={tw`flex-row mt-3 items-center justify-between pl-7 pr-7`}>
                <Text style={tw`text-white text-lg text-center font-bold`}>실제 수면 시간</Text>
                <Text style={tw`text-white text-lg text-center font-bold`}>8시간 30분</Text>
            </View>
        </View>
    )
}

export default SleepDataInfo;