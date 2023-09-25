import {View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity} from "react-native";
import { useState } from "react";
import { Video } from "expo-av";
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";
import { useRecoilState} from 'recoil';
import {motionModalState} from '../../recoil/modal/motionModalAtom';

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

// 예시 이미지
import ex_forward from '../../assets/motion/ex_forward.png';

// 컴포넌트
import BackDrop from "../Modal/BackDrop";

const SleepMotion = () => {
    const [modalVisible, setModalVisible] = useRecoilState(motionModalState);
    const [modalImg, setModalImg] = useState("ex");
    const [motions, setMotions] = useState([
        {
            no : 1,
            time : "11:00 PM"
        },
        {
            no : 2,
            time : "3:00 AM"
        },
        {
            no : 1,
            time : "7:00 AM"
        },
        {
            no :  3,
            time : "9:00 AM"
        },
        {
            no : 2,
            time : "3:00 AM"
        },

    ]);

    const showModal = () => {
        setModalVisible(true);
    }


    return(
        <ScrollView
            pagingEnabled
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={tw`w-full h-[300px] bg-[#091B35] mt-5 rounded-lg p-5`}>
            {
                motions.map((data, index)=>{
                    return(
                        
                        data.no===1?<TouchableOpacity onPress={()=>showModal("1유형","1유형")} style={tw`w-20 h-full items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-50`} source={M_motion_forward} resizeMode="contain"/><Text style={tw`text-white font-bold`}>{data.time}</Text></TouchableOpacity>:(
                            data.no===2?<TouchableOpacity style={tw`w-20 h-full items-center justify-between mr-5`}><Image  style={tw`mr-5 w-full h-50`} source={M_motion_shirimp_right} resizeMode="contain"/><Text style={tw`text-white font-bold`}>{data.time}</Text></TouchableOpacity>:(
                                data.no===3?<TouchableOpacity style={tw`w-20 h-full items-center justify-between mr-5`}><Image style={tw`mr-5 w-full h-50`} source={M_motion_reverse} resizeMode="contain"/><Text style={tw`text-white font-bold`}>{data.time}</Text></TouchableOpacity>:null
                            )
                        )
                        
                    )
                })
            }

        </ScrollView>
    )
}

export default SleepMotion;