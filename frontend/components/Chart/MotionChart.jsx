import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import tw from 'twrnc';
import Svg, { Image as SvgImage } from 'react-native-svg';

// axios
import {nonAuthHttp} from '../../axios/axios';

//recoil
import {useRecoilState} from 'recoil';
import {userSeq} from '../../recoil/user/userAtom';

const MotionChart = ({selectedDate}) => {

    const [memberSeq, setMemberSeq] = useRecoilState(userSeq);
    const [avgTime, setAvgTime] = useState(0);

  const barData = [
    {value: Number(avgTime),label: 'Today',frontColor: '#FFB6C1'},
    {value: 0,label: '',frontColor: '#28B2B3'},

    {value: 6.9,label: '한국평균',frontColor: '#FFD700'},
    {value: 0,label: '',frontColor: '#28B2B3'},

    {value: 8 ,label: '권장',frontColor: '#98FB98'},
    ];


    //axios 연결
    const axiosavgSleepTime = () => {
        const data = {
          "memberSeq": memberSeq,
          "sleepDate": selectedDate
        }
        nonAuthHttp.post(`/api/member/avg-sleep-time`, data)
        .then(response => {
            const result = response.data;
            console.log(result);
            if (result) {
              setAvgTime(result)
            }
        })
        .catch(error => {
            const err = error;
            console.log(err);
        });
      }

      useEffect(()=>{
        axiosavgSleepTime();
      },[selectedDate])



    return (
        <View>
            <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            maxValue={10}
            data={barData}
            barBorderRadius={5}
            isAnimated
            xAxisLabelTextStyle={tw`text-white`}
            yAxisTextStyle={tw`text-white`}
            xAxisColor={"#00ff0000"}
            yAxisColor={"#00ff0000"}
            
            />
        </View>

    );
};

export default MotionChart;