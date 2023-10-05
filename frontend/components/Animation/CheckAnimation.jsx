import LottieView from 'lottie-react-native';
import tw from 'twrnc'; 
// import {useRecoilState} from 'recoil';
// import {centerModalState} from '../../recoil/centerModal/atom';
import {View, Dimensions, StyleSheet, Button, Text} from "react-native";

import React, {useState, useEffect, useRef} from 'react';

const CheckAnimation = () => {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    const handleAnimationFailure = () => {
        console.log(12);
        // 또는 실패했을 때 수행하고자 하는 다른 작업을 여기에 추가하세요.
    };

    

    return(
        <View style={tw`absolute w-full items-center justify-center ml-0`}>
            <LottieView
                style={tw`z-10 w-150 h-150`}
                source={require('../../assets/lotties/checkAnimation.json')}
                ref={animation}
                autoPlay
                loop
                onAnimationFailure={handleAnimationFailure}
                onLoad={() => console.log("lottie start")}
            />

            <Text style={tw`flex-1 z-10 w-150 h-150`}>연결중...</Text>

        </View>
    )
}

export default CheckAnimation


const styles = StyleSheet.create({
    animationContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonContainer: {
      paddingTop: 1,
    },
  });