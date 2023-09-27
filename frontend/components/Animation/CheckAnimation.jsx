import LottieView from 'lottie-react-native';
import tw from 'twrnc'; 
// import {useRecoilState} from 'recoil';
// import {centerModalState} from '../../recoil/centerModal/atom';
import {View, Dimensions} from "react-native";

import React, {useState, useEffect} from 'react';

const CheckAnimation = () => {

    // const [modalVisible, setModalVisible] = useRecoilState(centerModalState);
    

    return(
        <View style={tw`absolute w-full items-center justify-center ml-30 mt-3`}><LottieView style={tw`z-10 w-150 h-150`} source={require('../../assets/lotties/checkAnimation.json')} autoPlay loop/></View>
    )
}

export default CheckAnimation