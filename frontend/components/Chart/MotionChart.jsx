import React from 'react';
import { View, Text, Image } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

// 이미지 가져오기
import G_motion_forward from '../../assets/motion/G_motion_forward.png';
import G_motion_hands_up from '../../assets/motion/G_motion_hands_up.png';
import G_motion_origin_left from '../../assets/motion/G_motion_origin_left.png';
import G_motion_origin_right from '../../assets/motion/G_motion_origin_right.png';
import G_motion_reverse from '../../assets/motion/G_motion_reverse.png';
import G_motion_shirimp_left from '../../assets/motion/G_motion_shirimp_left.png';
import G_motion_shirimp_right from '../../assets/motion/G_motion_shirimp_right.png';

const MotionChart = () => {
  const barData = [
    {
      value: 40,
      label: '1유형',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
      src: G_motion_forward,
    },
    {
      value: 40,
      label: '2유형',
      frontColor: '#79C3DB',
      sideColor: '#68BCD7',
      topColor: '#9FD4E5',
      src: G_motion_hands_up,
    },
    {
      value: 25,
      label: '3유형',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
      src: G_motion_origin_left,
    },
    {
      value: 1,
      label: '4유형',
      frontColor: '#4ADDBA',
      sideColor: '#36D9B2',
      topColor: '#7DE7CE',
      src: G_motion_origin_right,
    },
    {
      value: 1,
      label: '5유형',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
      src: G_motion_reverse,
    },
    {
      value: 1,
      label: '6유형',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
      src: G_motion_shirimp_left,
    },
    {
      value: 1,
      label: '7유형',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
      src: G_motion_shirimp_right,
    },
    {
      value: 1,
      label: '기타유형',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
      src: G_motion_forward,
    },
    {
      value: 1,
      label: '미수면',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
      src: G_motion_forward,
    },
  ];

  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#091B35',
      }}>
      <BarChart
        showFractionalValue
        showYAxisIndices
        hideRules
        noOfSections={4}
        maxValue={100}
        data={barData}
        barWidth={40}
        sideWidth={15}
        isThreeD
        side="right"
        xAxisColor={'lightgray'}
        xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
        xAxisLength={250}
        yAxisColor={'lightgray'}
        yAxisTextStyle={{ color: 'lightgray' }}
        yAxisLabelTexts={['0%', '25%', '50%', '75%', '100%']}
        renderBar={(bar, index) => {
          const imageSrc = barData[index].src;
          console.log(`rr`);
          console.log(imageSrc);

          return (
            <View key={index} style={tw`w-[100px] h-[100px]`}>
              {bar}
              {imageSrc && (
                <Image key={index}
                  source={imageSrc}
                  style={{
                    width: 100,
                    height: 30,
                    position: 'absolute',
                    top: -35,
                    left: bar.width / 2 - 15,
                    backgroundColor:'red'
                  }}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default MotionChart;