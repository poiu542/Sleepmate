import {View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import { Video } from "expo-av";
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";
import { useRecoilState} from 'recoil';
import {motionModalState} from '../../recoil/modal/motionModalAtom';
import { motionDescState } from "../../recoil/modal/motionDescAtom";

// 이미지
import G_motion_forward from '../../assets/motion/G_motion_forward.png';
import G_motion_hands_up from '../../assets/motion/G_motion_hands_up.png';
import G_motion_origin_left from '../../assets/motion/G_motion_origin_left.png';
import G_motion_origin_right from '../../assets/motion/G_motion_origin_right.png';
import G_motion_reverse from '../../assets/motion/G_motion_reverse.png';
import G_motion_shirimp_left from '../../assets/motion/G_motion_shirimp_left.png';
import G_motion_shirimp_right from '../../assets/motion/G_motion_shirimp_right.png';

import M_motion_forward from '../../assets/motion/M_motion_forward.png';
import M_motion_hands_up from '../../assets/motion/M_motion_hands_up.png';
import M_motion_origin_left from '../../assets/motion/M_motion_origin_left.png';
import M_motion_origin_right from '../../assets/motion/M_motion_origin_right.png';
import M_motion_reverse from '../../assets/motion/M_motion_reverse.png';
import M_motion_shirimp_left from '../../assets/motion/M_motion_shirimp_left.png';
import M_motion_shirimp_right from '../../assets/motion/M_motion_shirimp_right.png';

import cancel from '../../assets/motion/cancel.png';
import questionMark from '../../assets/motion/questionMark.png';

// 예시 이미지
import ex_forward from '../../assets/motion/ex_forward.png';

// 컴포넌트
import BackDrop from "../Modal/BackDrop";

// axios
import {nonAuthHttp} from '../../axios/axios';

const SleepMotion = ({selectedDate}) => {
    const [modalVisible, setModalVisible] = useRecoilState(motionModalState);
    const [motionDesc, setMotionDesc] = useRecoilState(motionDescState);

    const [loadingBar, setLoadingBar] = useState(true);

    const [modalImg, setModalImg] = useState("ex");
    const [motions, setMotions] = useState([
        {
            posture : 1,
            time : "2023-09-24T17:49:40",
            capture:""
        },
        {
            posture : 2,
            time : "2023-09-24T17:49:40",
            capture:""
        },
        {
            posture : 1,
            time : "2023-09-24T17:49:40",
            capture:""
        },
        {
            posture :  3,
            time : "2023-09-24T17:49:40",
            capture:""
        },
        {
            posture : 2,
            time : "2023-09-24T17:49:40",
            capture:""
        },

    ]);

    const [count, setCount] = useState(0);


    const showModal = (type, imgSrc, desc) => {
        setMotionDesc({
            type,
            imgSrc,
            desc,
        });
        setModalVisible(true);
    }


    // axios 요청
    const axiosPoseDataList = () => {
        const data = {
            "memberSeq" : 1,
            "sleepDate" : selectedDate
        }
        nonAuthHttp.post(`/api/posture/change`, data)
        .then(response => {
            setLoadingBar(false);
            const result = response.data;
            // console.log(result);
            if (result) {
                // [
                //     {
                //     "posture" : 1,
                //     "time" : "2023-09-24T17:49:40",
                //     "capture" : ""
                //     }, {…}, …
                // ]
                setMotions(result)
            }
        })
        .catch(error => {
            const err = error;
            console.log(err);
        });
      }

    const axiosSleepChangeCount = () => {
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
        axiosPoseDataList();
        axiosSleepChangeCount();
      },[selectedDate])


    return(
        <View style={tw`w-full h-90 bg-[#000]/50 mt-7 rounded-4 p-5`}>
        <Text style={tw`text-white text-4 text-center font-bold mt-2`}>AI가 분석한 수면 자세</Text>
        <Text style={tw`text-[#FFF1D4] text-3.3 text-center mt-2`}>어젯밤 총 {count}번의 자세변화가 있었어요.</Text>
        <ScrollView
            pagingEnabled
            horizontal 
            showsHorizontalScrollIndicator={false}
            >
                
            {
                //1 : FW
                //2 : 엎드려
                //3 : 만세
                //4 : 왼쪽눕기
                //5 : 왼쪽 새우잠
                //6 : 오른쪽 눕기
                //7 : 오른쪽 새우잠
                //8 : 기타포즈
                //9 : OUT
                count!==0?motions.map((data, index)=>{
                    return(
                        
                        data.posture===1?<TouchableOpacity onPress={()=>showModal(1, motions[0].capture, "FW(Forward) 정자세 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={M_motion_forward} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                            data.posture===2?<TouchableOpacity onPress={()=>showModal(2, motions[1].capture, "BACK 엎드림 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image  style={tw`mr-5 w-full h-45`} source={M_motion_reverse} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                data.posture===3?<TouchableOpacity onPress={()=>showModal(3, motions[2].capture, "UP 만세 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={M_motion_hands_up} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                    data.posture===4?<TouchableOpacity onPress={()=>showModal(4, motions[3].capture, "LEFT 왼쪽눕기 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={M_motion_origin_left} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                        data.posture===5?<TouchableOpacity onPress={()=>showModal(5, motions[4].capture, "LEFT_S 왼쪽새우 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={M_motion_shirimp_left} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                            data.posture===6?<TouchableOpacity onPress={()=>showModal(6, motions[5].capture, "RIGHT 오른쪽눕기 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={M_motion_origin_right} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                                data.posture===7?<TouchableOpacity onPress={()=>showModal(7, motions[6].capture, "RIGHT_S 오른쪽새우 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={M_motion_shirimp_right} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                                    data.posture===8?<TouchableOpacity onPress={()=>showModal(8, motions[7].capture, "etc 기타 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={questionMark} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:(
                                                        data.posture===9?<TouchableOpacity onPress={()=>showModal(9, motions[8].capture, "X 없음 유형입니다.")} style={tw`w-20 h-20 items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-45`} source={cancel} resizeMode="contain"/><Text style={tw`text-white`}>{data.time.split("T")[1]}</Text></TouchableOpacity>:null
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                        
                    )
                }):<Text style={tw`text-white font-black w-[350px] h-full pt-30 pl-20`}>데이터가 존재하지 않습니다.</Text>
            }

        {
            loadingBar&&<ActivityIndicator style={tw`flex-1 w-10 h-10 mt-25 ml-35`} color="white" size="large"/>
        }

        </ScrollView>
        <Text style={tw`text-white text-3 text-center mt-2`}>* 각 이미지 클릭 시 자세한 나의 모습을 볼 수 있어요</Text>


        </View>
    )
}

export default SleepMotion;