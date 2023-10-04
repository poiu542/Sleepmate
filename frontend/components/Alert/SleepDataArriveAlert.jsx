import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, Animated} from 'react-native';
import tw from 'twrnc';

// 이미지
import alarm_bell from '../../assets/alarm/data_alarm.png';

// axios
import {nonAuthHttp} from '../../axios/axios';

//recoil
import {useRecoilState} from 'recoil';
import {userSeq} from '../../recoil/user/userAtom';

const SleepDataArriveAlert = ({selectedDate}) => {

    const [count, setCount] = useState(0);
    const [memberSeq, setMemberSeq] = useRecoilState(userSeq);


    //axios 연결
    const axiosSleepMotionCount = () => {
        const data = {
          "memberSeq": memberSeq,
          "sleepDate": selectedDate
        }
        nonAuthHttp.post(`/api/video`, data)
        .then(response => {
            const result = response.data;
            if (result) {
                setCount(result)
            }
        })
        .catch(error => {
            const err = error;
            console.log(err);
        });
      }
  
  
      useEffect(()=>{
        axiosSleepMotionCount();
      },[selectedDate])


    return(

          <View 
            style={tw`flex-row w-full h-13 bg-[#000]/50 rounded-3 items-center justify-center`}>
              <Image style={tw`w-5 h-5  mr-3`} source={alarm_bell}/>
              <Text style={tw`text-white text-[3.3] text-center font-bold`}>
                  {count}건의 분석 비디오가 도착했습니다.
              </Text>
          </View>
    )
}


export default SleepDataArriveAlert;