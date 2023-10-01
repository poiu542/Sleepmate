import React from 'react';
import { View, Text, Image } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import tw from 'twrnc';
import Svg, { Image as SvgImage } from 'react-native-svg';

const MotionChart = () => {
  const barData = [
    {value: 4.5,label: 'Today',frontColor: '#FFB6C1'},
    {value: 0,label: '',frontColor: '#28B2B3'},

    {value: 6,label: '평균',frontColor: '#FFD700'},
    {value: 0,label: '',frontColor: '#28B2B3'},

    {value: 8,label: '권장',frontColor: '#98FB98'},
    ];
    return (
        <View>
            <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            maxValue={12}
            data={barData}
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