import { PieChart } from "react-native-gifted-charts";
import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import Svg, { Image as SvgImage } from 'react-native-svg';

const MotionCircleChart = () => {
    const renderLegend = (text, color) => {
        return (
          <View style={{flexDirection: 'row', marginBottom: 12}}>
            <View
              style={{
                height: 18,
                width: 18,
                marginRight: 10,
                borderRadius: 4,
                backgroundColor: color || 'white',
              }}
            />
            <Text style={{color: 'white', fontSize: 16}}>{text || ''}</Text>
          </View>
        );
      };
    
      return (
        <View style={tw`bg-[#000]/50 rounded-3`}>
          <View
            style={{
              marginHorizontal: 30,
              paddingVertical: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>


            {/*********************    Custom Header component      ********************/}
            <Text
              style={[{
                color: 'white',
                fontWeight: 'bold',
                marginBottom: 12,
              },tw`text-4`]}>
              나의 자세 유형
            </Text>

            <Text style={tw`text-[#FFF1D4] text-3.3 text-center mb-5`}>앞으로 반듯이 누워서 자는 자세가 가장 편하시군요?</Text>
            {/****************************************************************************/}


            <PieChart
              strokeColor="white"
              strokeWidth={4}
              donut
              isAnimated
              data={[
                {value: 10, color: '#FFAB91'},
                {value: 10, color: '#FFD700'},
                {value: 10, color: '#FFECB3'},

                {value: 10, color: '#98FB98'},
                {value: 10, color: '#ADD8E6'},
                {value: 10, color: '#D8BFD8'},

                {value: 10, color: '#E6E6FA'},
                {value: 10, color: '#D3D3D3'},
                {value: 10, color: '#D3D3D3'},
              ]}
              innerCircleColor="#414141"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={'white'}
              showValuesAsLabels={true}
              showText
              textSize={15}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={{color: 'white', fontSize: 36, textAlign:"center"}}>10</Text>
                    <Text style={{color: 'white', fontSize: 18, textAlign:"center"}}>FW</Text>
                  </View>
                );
              }}
            />


            {/*********************    Custom Legend component      ********************/}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {renderLegend('FW', '#FFB6C1')}
              {renderLegend('LSR', '#FFD700')}
              {renderLegend('LST', '#FFECB3')}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {renderLegend('UP', '#98FB98')}
              {renderLegend('RSR', '#ADD8E6')}
              {renderLegend('RST', '#D8BFD8')}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {renderLegend('RVS', '#E6E6FA')}
              {renderLegend('X      ', '#D3D3D3')}
              {renderLegend('OUT', '#D3D3D3')}
            </View>
            {/****************************************************************************/}

            
          </View>
        </View>
    );
}

export default MotionCircleChart;