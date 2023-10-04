import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Pressable, Modal, StatusBar } from 'react-native';
import moon from "../assets/images/Diagnosis-background.png"
import title from "../assets/images/Diagnosis-title.png"
import sun from "../assets/images/Sunny.png"
import tw from "twrnc"
import Circadian from '../components/ReportBlock/Circadian';
import Rem from '../components/ReportBlock/Rem';
import Breath from '../components/ReportBlock/Breath';
import CalendarHorizontal from '../components/Calendar/CalendarHorizontal';

function Diagnosis() {
    const [selectedDate, setSelectedDate] = useState();

    return (
        <>
        <StatusBar style="auto"/>
        <View style={tw `flex flex-1 bg-[#16151A]`}>
            <ScrollView style={tw `p-3 py-8`}>
                <Text style={tw `p-1 my-5 text-[#ddd] text-lg font-bold self-center `}>수면 진단 리포트</Text>
                 <CalendarHorizontal onSelectDate={setSelectedDate} selected={selectedDate} />
                        
                {/* 진단박스1 */}
                <Circadian></Circadian>
                <Breath></Breath>
                <Rem></Rem>
            </ScrollView>
        </View>
        </>
    );
}

export default Diagnosis;