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
    // useEffect(()=>{
    //     const today = new Date().toISOString();
    //     setSelectedDate(today)
    // })
    return (
        <>
        <StatusBar style="auto"/>
        <View style={tw `flex flex-1 bg-[#111]`}>
            <Image style={tw `mt-15 ml-5 mb-1`} source={title}></Image>
            <ScrollView style={tw `p-3 py-8`}>
                 <CalendarHorizontal onSelectDate={setSelectedDate} selected={selectedDate} />
                        
                {/* 진단박스1 */}
                <Circadian></Circadian>
                <Breath></Breath>
                <Rem></Rem>
            </ScrollView>
            {/* <Modal
                animated
                animationType="fade"
                visible={true}
                transparent
                onRequestClose={() => this._handleDismiss()}>
                <View style={tw `bg-[#fff]/90 flex-1 justify-end`}>
                    
                </View>
            </Modal> */}
        </View>
        </>
    );
}

export default Diagnosis;