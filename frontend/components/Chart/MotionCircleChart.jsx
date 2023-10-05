import { PieChart } from "react-native-gifted-charts";
import React, {useEffect, useState} from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Svg, { Image as SvgImage } from 'react-native-svg';

// axios
import {nonAuthHttp} from '../../axios/axios';

//recoil
import {useRecoilState} from 'recoil';
import {userSeq} from '../../recoil/user/userAtom';

const MotionCircleChart = ({selectedDate}) => {

  const [memberSeq, setMemberSeq] = useRecoilState(userSeq);
  
  const [bestPose, setBestPose] = useState({
    "posture" : 1,
    "percentage" : 0.1
  });

  const [loadingBar, setLoadingBar] = useState(true);

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
        "memberSeq" : memberSeq,
        "sleepDate" : selectedDate
    }
    nonAuthHttp.post(`/api/posture/posture/most`, data)
    .then(response => {
        const result = response.data;
        // console.log(result);
        if (result) {
          // {
          //   "posture" : 1,
          //   "percentage" : 0.5
          //   }
          setBestPose(result)
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
        "memberSeq" : memberSeq,
        "sleepDate" : selectedDate
    }
    nonAuthHttp.post(`/api/posture/posture`, data)
    .then(response => {
      setLoadingBar(false);
        const result = response.data;
        // console.log(result);
        if (result) {
        //   [
        //     {
        //         "posture": 0,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 1,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 2,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 3,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 4,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 5,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 6,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 7,
        //         "percentage": "NaN"
        //     },
        //     {
        //         "posture": 8,
        //         "percentage": "NaN"
        //     }
        // ]
          setTotalPose(result)
        }
    })
    .catch(error => {
        const err = error;
        console.log(err);
    });
  }


  useEffect(()=>{
    axiosBestPose();
    axiosTotalPosePercentage();
  },[selectedDate])


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
          {totalPose[0].percentage!=="NaN"?<View
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
                {value: totalPose[0].percentage=="NaN"?0:totalPose[0].percentage*100, color: '#FFAB91'},
                {value: totalPose[1].percentage=="NaN"?0:totalPose[1].percentage*100, color: '#FFD700'},
                {value: totalPose[2].percentage=="NaN"?0:totalPose[2].percentage*100, color: '#FFECB3'},

                {value: totalPose[3].percentage=="NaN"?0:totalPose[3].percentage*100, color: '#98FB98'},
                {value: totalPose[4].percentage=="NaN"?0:totalPose[4].percentage*100, color: '#ADD8E6'},
                {value: totalPose[5].percentage=="NaN"?0:totalPose[5].percentage*100, color: '#D8BFD8'},

                {value: totalPose[6].percentage=="NaN"?0:totalPose[6].percentage*100, color: '#E6E6FA'},
                {value: totalPose[7].percentage=="NaN"?0:totalPose[7].percentage*100, color: '#D3D3D3'},
                {value: totalPose[8].percentage=="NaN"?0:totalPose[8].percentage*100, color: '#D3D3D3'},
              ]}
              innerCircleColor="#000"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={'#000'}
              strokeColor={"#000"}
              showValuesAsLabels={true}
              showText
              textSize={12}
              showTextBackground={true}
              // textBackgroundRadius={15}
              centerLabelComponent={() => {
                return (
                  //1 : FW
                  //2 : 엎드려
                  //3 : 만세
                  //4 : 왼쪽눕기
                  //5 : 왼쪽 새우잠
                  //6 : 오른쪽 눕기
                  //7 : 오른쪽 새우잠
                  //8 : 기타포즈
                  //9 : OUT
                  <View>
                    
                    <Text style={{color: 'white', fontSize: 15, textAlign:"center"}}>
                      {bestPose.posture==1? "FW":(
                        bestPose.posture==2? "BACK":(
                          bestPose.posture==3? "UP":(
                            bestPose.posture==4? "LEFT":(
                              bestPose.posture==5? "LEFT_R":(
                                bestPose.posture==6? "RIGHT":(
                                  bestPose.posture==7? "RIGHT_R":(
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
                    <Text style={{color: 'white', fontSize: 18, textAlign:"center"}}>{bestPose.percentage!="NaN"?bestPose.percentage*100:0}%</Text>
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
              {renderLegend('바로잠', '#FFB6C1')}
              {renderLegend('엎드린잠', '#FFD700')}
              {renderLegend('만세', '#FFECB3')}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {renderLegend('왼쪽', '#98FB98')}
              {renderLegend('왼쪽새우잠', '#ADD8E6')}
              {renderLegend('오른쪽', '#D8BFD8')}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {renderLegend('오른새우잠', '#E6E6FA')}
              {renderLegend('기타      ', '#D3D3D3')}
              {renderLegend('None', '#D3D3D3')}
            </View>
            {/****************************************************************************/}

            
          </View>:<View  style={{
              marginHorizontal: 30,
              paddingVertical: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[{
                color: 'white',
                fontWeight: 'bold',
                marginBottom: 12,
              },tw`text-4`]}>
              나의 자세 유형
            </Text>
            <Text style={tw`text-white font-black w-[350px] h-[300px] pt-30 pl-25`}>데이터가 존재하지 않습니다.</Text></View>}
            {
              loadingBar&&<ActivityIndicator style={tw`flex-1 w-10 h-10 ml-40 mt-30 h-[300px]`} color="white" size="large"/>
            }
        </View>
    );
}

export default MotionCircleChart;