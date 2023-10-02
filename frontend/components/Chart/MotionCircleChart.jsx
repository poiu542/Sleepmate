import { PieChart } from "react-native-gifted-charts";
import React, {useEffect, useState} from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import Svg, { Image as SvgImage } from 'react-native-svg';

// axios
import {nonAuthHttp} from '../../axios/axios';

const MotionCircleChart = ({selectedDate}) => {
  
  const [bestPose, setBestPose] = useState({
    "posture" : 1,
    "percentage" : 0.1
  });

  const [totalPose, setTotalPose] = useState([
           {"posture" : 1,
           "percentage" : 0.1},

           {"posture" : 2,
           "percentage" : 0.1},

           {"posture" : 3,
           "percentage" : 0.1},

           {"posture" : 4,
           "percentage" : 0.1},

           {"posture" : 5,
           "percentage" : 0.1},

           {"posture" : 6,
           "percentage" : 0.1},

           {"posture" : 7,
           "percentage" : 0.1},

           {"posture" : 8,
           "percentage" : 0.1},

           {"posture" : 9,
           "percentage" : 0.1},
  ]);

  // axios 요청
  // 1. 베스트 포즈
  const axiosBestPose = () => {
    const data = {
        "memberSeq" : 1,
        "sleepDate" : selectedDate
    }
    nonAuthHttp.post(`/api/posture/most`, data)
    .then(response => {
        const result = response.data;
        // console.log(result);
        if (result) {
          // {
          //   "posture" : 1,
          //   "percentage" : 0.5
          //   }
            // setBestPose(result.result)
        }
    })
    .catch(error => {
        const err = error;
        console.log(err);
    });
  }

  // 2. 전체 자세 퍼센티지
  const axiosTotalPosePercentage = () => {
    const data = {
        "memberSeq" : 1,
        "sleepDate" : selectedDate
    }
    nonAuthHttp.post(`/api/posture`, data)
    .then(response => {
        const result = response.data;
        // console.log(result);
        if (result) {
          // {
          //   postureList : [
          //        {”posture” : 1,
          //        “percentage” : 0.5},
          //        {”posture” : 2,
          //        “percentage” : 0.2}, …
          //     ]
          //   }
          //   setTotalPose(result.result.postureList)
        }
    })
    .catch(error => {
        const err = error;
        console.log(err);
    });
  }


  // useEffect(()=>{
  //   axiosBestPose();
  //   axiosTotalPosePercentage();
  // },[])


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
              strokeWidth={4}
              donut
              isAnimated
              textColor="black"
              data={[
                {value: totalPose[0].percentage*100, color: '#FFAB91'},
                {value: totalPose[1].percentage*100, color: '#FFD700'},
                {value: totalPose[2].percentage*100, color: '#FFECB3'},

                {value: totalPose[3].percentage*100, color: '#98FB98'},
                {value: totalPose[4].percentage*100, color: '#ADD8E6'},
                {value: totalPose[5].percentage*100, color: '#D8BFD8'},

                {value: totalPose[6].percentage*100, color: '#E6E6FA'},
                {value: totalPose[7].percentage*100, color: '#D3D3D3'},
                {value: totalPose[8].percentage*100, color: '#D3D3D3'},
              ]}
              innerCircleColor="#000"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={'#000'}
              strokeColor={"#000"}
              showValuesAsLabels={true}
              showText
              textSize={15}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={{color: 'white', fontSize: 36, textAlign:"center"}}>
                      {bestPose.posture==1? "FW":(
                        bestPose.posture==2? "LSR":(
                          bestPose.posture==3? "LST":(
                            bestPose.posture==4? "UP":(
                              bestPose.posture==5? "RSR":(
                                bestPose.posture==6? "RST":(
                                  bestPose.posture==7? "RVS":(
                                    bestPose.posture==8? "X":(
                                      bestPose.posture==9? "OUT": null
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )}
                    </Text>
                    <Text style={{color: 'white', fontSize: 18, textAlign:"center"}}>{bestPose.percentage*100}%</Text>
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