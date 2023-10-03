import React, { useEffect } from 'react';
import {useState} from "react"
import { Text, View, ImageBackground, Image, ScrollView, Pressable } from 'react-native';
import sun from "../../assets/images/Sunny.png"
import tw from "twrnc"
import BottomSheetModal from './BottomSheetModal';
import { diagnosisDateState } from '../../recoil/date/diagnosisDate';
import { useRecoilState } from 'recoil';
import { nonAuthHttp } from '../../axios/axios';
import { FontAwesome } from '@expo/vector-icons';
import HeartChart from './HeartChart';
import ServiceLoading from '../../screens/ServiceLoading';
function Breath(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [date, setDate] = useRecoilState(diagnosisDateState);
    const [data, setData] = useState(null);
    const [bmiStatus, setBmiStatus] = useState();
    const [bmi, setBmi] = useState();
    const [normal, setNormal] = useState(true);

    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };
    function calBmi(value){
        if(value<18.5){
            setBmiStatus("저체중");
        } else if (value< 23 && value>=18.5){
            setBmiStatus("정상");
        } else if (23 <= value && value <25){
            setBmiStatus("과체중");
        } else {
            setBmiStatus("비만");
        }
    }
    function getBreath(){
        
        async function requestBreath(){
            const send = {
                sleepDate : "2023-09-21",
                memberSeq : 1
            }
            console.log(date);
            try {
                const response = await nonAuthHttp.post(`api/health/heart-rate`, send);
                console.log(response.data);
                //정상이면
                if(response.data.minHeartRate){
                    console.log("normal!");
                    setNormal(true);
                    setData(response.data);
                    setBmi(response.data.bmi);
                    const value = response.data.bmi;
                    //bmi에 대한 판단 로직
                    calBmi(value);
                    
                } else {
                    setNormal(false);
                    console.log("not normal");
                    const value = response.data[0].bmi;
                    setBmi(value);
                    calBmi(value);
                    setData(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        requestBreath()
    }
    useEffect(()=>{
        setData(null); //데이터 값을 없애주기 
        getBreath(); //데이터값 생김
    
    },[])

    if(!data){
        return (
            <ServiceLoading/>
        )
    } else {
        return (
            <>
            <View style={tw `flex-1 w-full bg-[#333] rounded-7 p-3 mb-6`}>
                        {/* header */}
                        <View style={tw `flex-1 flex-row`}>
                            <View style={tw `flex-2 `}>
                                <Text style={tw `text-lg text-[#fff] font-bold text-[4]`}>심박수 안정도</Text>
                            </View>
                            <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                                <Text style={tw `text-[#ccc] text-xs`}>&#62; more</Text>
                            </Pressable>
                            {
                                normal? 
                            <View style={tw `flex-1  items-end`}>
                                <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#A897BF]/50 items-center justify-center`}><Text style={tw `text-white font-bold`}>정상</Text></View>
                            </View>
                                :
                                <View style={tw `flex-1  items-end`}>
                                <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#A45555]/80 items-center justify-center`}><Text style={tw `text-white font-bold`}>주의</Text></View>
                            </View>
                            }
                        </View>
                        {/* body */}
                      
                        <View style={tw `flex-2 flex-row p-2 my-3`}>
                        {
                            normal?
                            <View style={tw `flex-2`}>
                            <Text style={tw `text-[#fff] text-[3.5] mb-1`}>심박수 안정도는 "정상"입니다.</Text>
                            <Text style={tw `text-[#FFF1D4] text-[2.7] mb-0`}>40-85사이의 심박수는 정상으로 간주</Text>
                            <HeartChart min={data.minHeartRate} max={data.maxHeartRate}></HeartChart>
                            </View>
                            :
                            <View style={tw `flex-2 border-[0.3] border-white `}>
                                <Text style={tw `text-[#fff] text-sm mb-3`} >비정상 심박수 감지 내역</Text>
                                <ScrollView style={tw `border-[#555] border-[0.2] h-50`}>
                                    {
                                        data.map((el) => {
                                            return (
                                                <>
                                                <View style={tw `flex-row justify-center items-center`}>
                                                <Text style={tw `flex-1 text-[#fff] text-sm font-bold mb-0`}>{el.detectedTime}</Text>
                                                <View style={tw `flex-1 flex-row`}>
                                                    <Text style={tw `text-[#fff] text-base font-bold mb-0`}>{el.abnormalHeartRate}</Text>
                                                    <Text style={tw `text-[#fff] text-xs mt-1.7`}>bpm</Text>
                                                </View>
                                                <Text style={tw `flex-1 text-[#fff] text-sm font-bold mb-0`}>{el.posture}</Text>
                                                </View>
                                                </>
                                            )
                                        })
                                    }
                                </ScrollView>

                            </View>
                        }
                            
                            {/* 공통부분 */}
                            <View style={tw `flex-1 items-center justify-center`}>
                                <Text style={tw `text-[#fff] text-xs font-bold mb-2`} >나의 BMI 지수</Text>
                                <FontAwesome name="balance-scale" size={27} color="white" />
                                <Text style={tw `mt-2 text-[#C0A4E5] text-base font-bold`}>{bmi}</Text>
                                <Text style={tw `text-[#FFF1D4] text-sm font-bold`}>{bmiStatus}</Text>
                            </View>
                            
                        </View>
                        {/* tail */}
                        <View style={tw `flex-1 items-center`}>
                            <View style={tw `rounded-2 border-[#ddd] border-[0.25] p-2 items-center w-full`}>
                                <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>수면 무호흡이 의심될 시 똑바로 누운 자세는 좋지 않습니다.</Text>
                                <Text style={tw `text-[3.2] text-[#ccc] tracking-tight`}>옆으로 눕거나 엎드린 자세를 권장드립니다.</Text>
                            </View>
                            <Text style={tw `text-[#ccc] text-[2.1] mt-1 tracking-tighter`}>* 수면 무호흡증은 심박수 만으로 판단할 수 없습니다. 정확한 진단을 위해 의사를 방문해주세요.</Text>
                        </View>
                    </View>
                    <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={2} />
            </>
        );
    }
}

export default Breath;