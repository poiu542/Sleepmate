import {View, ScrollView, Dimensions, StyleSheet, ImageBackground, Image} from "react-native";
import { useState } from "react";
import { Video } from "expo-av";
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";
import {LinearGradient} from 'expo-linear-gradient';

// 이미지
import turnOnTheLight from '../assets/background/turnOnTheLight.jpg';
import sunrise from '../assets/videos/sunrise.mp4';

// 컴포넌트
import CalendarHorizontal from "../components/Calendar/CalendarHorizontal";
import SleepDataArriveAlert from "../components/Alert/SleepDataArriveAlert";
import SleepDataInfo from "../components/Alert/SleepDataInfo";
import SleepMotion from "../components/Motion/SleepMotion";
import SleepVideoAlert from "../components/Alert/SleepVideoAlert";
import HR from "../components/Html/HR";
import SleepMotionPercent from "../components/Alert/SleepMotionPercent";
import MotionChart from "../components/Chart/MotionChart";

const Analysis = () => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height-500;

    const [selectedDate, setSelectedDate] = useState(null);
    return(
        <View style={tw`flex-1 bg-white`}>
            {/* <Image style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-100`} source={turnOnTheLight}/> */}
            <Video style={tw`absolute top-0 left-0 right-0 bottom-0 w-100 h-70`} source={sunrise} resizeMode={"cover"}></Video>

            <ScrollView>
                <LinearGradient
                    colors={['transparent', 'white', 'white', 'white', 'white', 'white', 'white']} // Define your gradient colors
                    start={{ x: 0, y: 1 }} // Gradient start point
                    end={{ x: 0, y: 1 }} // Gradient end point
                    style={tw`rounded-2xl shadow-2xl w-full self-center mt-70 pl-5 pr-5`} 
                >
            
                    <View style={styles.container}>
                        <CalendarHorizontal onSelectDate={setSelectedDate} selected={selectedDate} />
                        <StatusBar style="auto" />
                    </View>
                    {/* 도착 데이터 */}
                    <SleepDataArriveAlert/>

                    {/* 수면 시간 정리 */}
                    <SleepDataInfo/>

                    <HR/>

                    {/* 수면 자세 */}
                    <SleepVideoAlert/>
                    <SleepMotion/>

                    <HR/>

                    {/* 수면 그래프 */}
                    <SleepMotionPercent/>
                    <MotionChart/>


                 </LinearGradient>
            </ScrollView>

        </View>

    )
}

export default Analysis

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:50,
    },
  });