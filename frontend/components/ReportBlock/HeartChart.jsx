import React from 'react';
import { View, Text, Image } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import tw from 'twrnc';
import Svg, { Image as SvgImage } from 'react-native-svg';

const HeartChart = ({min, max}) => {
    // const minD = 40;
    // const maxD = 85;
  const barData = [
    {
        value: min,
        label: '최소',
        frontColor: '#C0A4E5', 
        topLabelComponent:()=>(
            <Text style={tw `text-[#C0A4E5] font-bold py-5 text-xs`}>{min}</Text>
        )
    },
    // {value: 40,label: '',frontColor: '#28B2B3'},
    {value: max,label: '최대',frontColor: '#B087E9',
    topLabelComponent:()=>(
        <Text style={tw `text-[#B087E9] font-bold py-5 text-xs`}>{max}</Text>
    )},
    // {value: 100,label: '',frontColor: '#28B2B3'},
    ];
    return (
        <View>
            <BarChart
            width={140}
            height={140}
            spacing={50}
            initialSpacing={25}
            endSpacing={25}
            noOfSections={3}
            maxValue={120}
            data={barData}
            barBorderRadius={4}
            barWidth={19}
            isAnimated
            xAxisLabelTextStyle={tw`text-white text-xs`}
            yAxisTextStyle={tw`text-white text-xs`}
            xAxisColor={"#00ff0000"}
            yAxisColor={"#00ff0000"}
            showYAxisIndices = {true}
            />
        </View>

    );
};

export default HeartChart;