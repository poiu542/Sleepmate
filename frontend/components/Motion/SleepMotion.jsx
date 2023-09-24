import {View, Text, ScrollView, Dimensions, StyleSheet, Image} from "react-native";
import { useState } from "react";
import { Video } from "expo-av";
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";

// 이미지
import motion1 from '../../assets/motion/motion1.png';
import motion2 from '../../assets/motion/motion2.png';
import motion3 from '../../assets/motion/motion3.png';

const SleepMotion = () => {
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

    return(
        <ScrollView
            pagingEnabled
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={tw`w-full h-[230px] bg-[#091B35] mt-5 rounded-lg p-5`}>
            {
                motions.map((data, index)=>{
                    return(
                        
                        data.no===1?<View style={tw`w-20 h-full items-center justify-between`}><Image style={tw`mr-5`} source={motion1}/><Text style={tw`text-white font-bold`}>{data.time}</Text></View>:(
                            data.no===2?<View style={tw`w-20 h-full items-center justify-between`}><Image style={tw`mr-5`} source={motion2}/><Text style={tw`text-white font-bold`}>{data.time}</Text></View>:(
                                data.no===3?<View style={tw`w-20 h-full items-center justify-between`}><Image style={tw`mr-5`} source={motion3}/><Text style={tw`text-white font-bold`}>{data.time}</Text></View>:null
                            )
                        )
                        
                    )
                })
            }

        </ScrollView>
    )
}

export default SleepMotion;