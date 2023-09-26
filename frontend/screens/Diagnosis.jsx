import React from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Pressable, Modal } from 'react-native';
import moon from "../assets/images/Diagnosis-background.png"
import title from "../assets/images/Diagnosis-title.png"
import sun from "../assets/images/Sunny.png"
import tw from "twrnc"
import Circadian from '../components/ReportBlock/Circadian';
import Rem from '../components/ReportBlock/Rem';
import Breath from '../components/ReportBlock/Breath';
function Diagnosis() {
    return (
        <>
        <View style={tw `flex flex-1`}>
            <ImageBackground source={moon} style={tw `w-full h-full absolute`}></ImageBackground>
            <Image style={tw `mt-15 ml-5 mb-1`} source={title}></Image>
            <ScrollView style={tw `p-3`}>
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