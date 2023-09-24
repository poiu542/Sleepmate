import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, Animated} from 'react-native';
import tw from 'twrnc';

// 이미지
import alarm_bell from '../../assets/alarm/data_alarm.png';

const SleepDataArriveAlert = () => {
    const [count, setCount] = useState(0);
    let animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      console.log(`hey0`);
      // 컴포넌트가 처음 렌더링될 때 숫자를 증가시키기 시작합니다.
      incrementCount();
    }, []);
    
    const incrementCount = () => {
        // 숫자를 10000까지 증가시키고 애니메이션을 시작합니다.
        if (count < 10000) {
          setTimeout(() => {
            setCount(count + 1);
            console.log(`hey1`);
          }, 100); // 50ms 딜레이를 주어서 순차적으로 증가하도록 합니다.
        }
    };

    useEffect(() => {
        console.log(`count = ${count}`);
        Animated.timing(animatedValue, {
          toValue: count,
          duration: 100, // 애니메이션 지속 시간 (1초)
          useNativeDriver: false, // 네이티브 드라이버를 사용하지 않음
        }).start();
    }, [count]);

    

    return(
        <View style={tw`flex-row w-full h-[60px] bg-[#091B35] rounded-50 items-center justify-center`}>
            <Image style={tw`w-7 h-7  mr-3`} source={alarm_bell}/>
            <Text style={tw`text-white text-[15px] text-center font-bold`}>
                <Animated.Text>{animatedValue}</Animated.Text>건의 데이터가 도착했습니다.
            </Text>
        </View>
    )
}


export default SleepDataArriveAlert;