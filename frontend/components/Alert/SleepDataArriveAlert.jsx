import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, Animated} from 'react-native';
import tw from 'twrnc';

// 이미지
import alarm_bell from '../../assets/alarm/data_alarm.png';

// axios
import {nonAuthHttp} from '../../axios/axios';

const SleepDataArriveAlert = ({selectedDate}) => {

    const [count, setCount] = useState(0);


    // axios 요청
    const axiosDataCount = () => {
      const data = {
        "memberSeq": 1,
        "sleepDate": selectedDate
      }
      nonAuthHttp.post(`/api/posture/change-count`, data)
      .then(response => {
          const result = response.data;
          if (result) {
              setCount(result.result)
          }
      })
      .catch(error => {
          const err = error;
          console.log(err);
      });
    }


    useEffect(()=>{
      axiosDataCount();
    },[])

    

    return(

          <View 
            style={tw`flex-row w-full h-13 bg-[#000]/50 rounded-3 items-center justify-center`}>
              <Image style={tw`w-5 h-5  mr-3`} source={alarm_bell}/>
              <Text style={tw`text-white text-[3.3] text-center font-bold`}>
                  {count}건의 분석 이미지가 도착했습니다.
              </Text>
          </View>
    )
}


export default SleepDataArriveAlert;