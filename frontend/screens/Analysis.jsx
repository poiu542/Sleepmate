import {View, ScrollView, Dimensions, StyleSheet, Text, Image, ImageBackground, ActivityIndicator} from "react-native";
import { useEffect, useState } from "react";
import { Video } from "expo-av";
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";
import {LinearGradient} from 'expo-linear-gradient';
import { useRecoilState} from 'recoil';
import {motionModalState} from '../recoil/modal/motionModalAtom';

// 이미지
import turnOnTheLight from '../assets/background/turnOnTheLight.jpg';
import sunrise from '../assets/videos/sunrise.mp4';

// axios
import {nonAuthHttp} from '../axios/axios';

// 컴포넌트
import CalendarHorizontal from "../components/Calendar/CalendarHorizontal";
import SleepDataArriveAlert from "../components/Alert/SleepDataArriveAlert";
import SleepDataInfo from "../components/Alert/SleepDataInfo";
import SleepMotion from "../components/Motion/SleepMotion";
import SleepVideoAlert from "../components/Alert/SleepVideoAlert";
import HR from "../components/Html/HR";
import SleepMotionPercent from "../components/Alert/SleepMotionPercent";
import BackDrop from "../components/Modal/BackDrop";
import bg from "../assets/images/report-bg.jpg";
import moonflower from "../assets/videos/moonflowerpink.mp4";
import homevideo2 from "../assets/videos/home_video2.mp4"
import MotionCircleChart from "../components/Chart/MotionCircleChart";

const Analysis = () => {

    // 오늘날짜 구하기
    const today = new Date();
    const year = String(today.getFullYear());
    let month = String(today.getMonth() + 1); // 월은 0부터 시작하므로 1을 더함
    let day = String(today.getDate());

    if((month.length)==1) month=`0${month}`;
    if((day.length)==1) day=`0${day-1}`;

    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height-500;

    const [kg, setKg] = useState("");

    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useRecoilState(motionModalState);

    const [loadingBar, setLoadingBar] = useState(true);
    

    useEffect(()=>{
        setSelectedDate(`${year}-${month}-${day}`);
    },[])

    // useEffect(()=>{
    //     console.log(selectedDate);
        
    // },[selectedDate])
    
    return(
        <>
        <View style={tw`flex-1 w-full h-full`}>
            {/* <Image style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-100`} source={turnOnTheLight}/> */}
            <Video style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-full`} source={homevideo2} resizeMode={"cover"} repeat={true} paused={false} accessible={()=>{setLoadingBar(false); console.log(false);}} onAnimatedValueUpdate={() => {setLoadingBar(false)}}></Video>
            {/* <Image style={tw `flex-1 absolute top-0 left-0 right-0 bottom-0 w-100 h-70`} source={turnOnTheLight} resizeMode="cover" ></Image> */}
            {loadingBar&&<ScrollView>
                <View style={tw`shadow-2xl w-full h-full self-center px-3 bg-[#222]`}>
                    <View style={styles.container}>
                        <CalendarHorizontal onSelectDate={setSelectedDate} selected={selectedDate} />
                        <StatusBar style="auto" />
                    </View>
                    {/* 도착 데이터 */}
                    <SleepDataArriveAlert selectedDate={selectedDate}/>

                    {/* 수면 시간 정리 */}
                    <SleepDataInfo selectedDate={selectedDate}/>

                    <HR/>

                    {/* 수면 자세 */}
                    <SleepMotion selectedDate={selectedDate}/>


                    <HR/>

                    <View style={tw`mt-5`}></View>

                    {/* 수면 그래프 */}
                    <MotionCircleChart selectedDate={selectedDate}/>

                    {modalVisible&&<BackDrop/>}
                    </View>
            </ScrollView>}


         </View>
        </>
    )
}

export default Analysis

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:30,
    },
  });