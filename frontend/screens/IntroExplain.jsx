import { StatusBar } from "expo-status-bar";
import {Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from "react";
import { Video } from "expo-av";
import tw from "twrnc";
import * as Animatable from 'react-native-animatable';

// 컴포넌트
import ClockPicker from "../components/Clock/ClockPicker";
import ConfirmBtn from "../components/Button/ConfirmBtn";
import DropDownTime from "../components/DropDown/DropDownTime";

// recoil
import {useRecoilState} from "recoil";
import {sceenNumberState} from '../recoil/intro/sceenNumberAtom';


const IntroExplain = () => {

    const [animation1, setAnimation1] = useState(null);
    const [animation2, setAnimation2] = useState(null);
    const [animation3, setAnimation3] = useState(null);
    const [animation4, setAnimation4] = useState(null);
    const [animation6, setAnimation6] = useState(null);
    const [animation8, setAnimation8] = useState(null);
    const [animation9, setAnimation9] = useState(null);
    const [sceen, setSceen] = useRecoilState(sceenNumberState);


    const height = Dimensions.get("window").height-150;

    // 애니메이션 효과
    useEffect(() => {
        if (sceen===1 && animation1) {
            setTimeout(() => {
                animation1.fadeOut(2000).then(() => {
                    setAnimation2(animation2Ref => {
                        setSceen(2);
                        if (animation2Ref) {
                            animation2Ref.fadeIn(2000);
                        }
                        return animation2Ref;
                    });
                });
            }, 2000);
        }

        if (sceen===2 && animation1) {
            setTimeout(() => {
                animation2.fadeOut(3000).then(() => {
                    setSceen(3);
                    setAnimation3(animation3Ref => {
                        if (animation3Ref) {
                            animation3Ref.fadeIn(3000);
                        }
                        return animation3Ref;
                    });
                });
            }, 3000);
        }

        if (sceen===3 && animation1) {
            setTimeout(() => {
                animation3.fadeOut(3000).then(() => {
                    setSceen(4);
                    setAnimation4(animation4Ref => { //평소 몇 시에 잠에 드시나요?
                        if (animation4Ref) {
                            animation4Ref.fadeIn(3000);
                        }
                        return animation4Ref;
                    });
                });
            }, 3000);
        }

        //sceen==4일땐 fade out 되면 안되니까 생략


        if (sceen===5 && animation1) {
            //sceen==4 없애고, sceen==5 질문 띄우기

            setTimeout(() => {
                animation4.fadeOut(3000).then(() => {
                    setSceen(6);
                    setAnimation6(animation6Ref => {//평소 몇 시간 정도 잠에 드시나요?
                        if (animation6Ref) {
                            animation6Ref.fadeIn(3000);
                        }
                        return animation6Ref;
                    });
                });
            }, 3000); 
        }

        //sceen==5일땐 fade out 되면 안되니까 생략

        if (sceen===7 && animation1) {

            setTimeout(() => {
                animation6.fadeOut(3000).then(() => {
                    setSceen(8);
                    setAnimation8(animation8Ref => {
                        if (animation8Ref) {
                            animation8Ref.fadeIn(3000);
                        }
                        return animation8Ref;
                    });
                });
            }, 3000);
        }

        if (sceen===8 && animation1) {
            setTimeout(() => {
                animation8.fadeOut(3000).then(() => {
                    setSceen(9);
                    setAnimation9(animation9Ref => {
                        if (animation9Ref) {
                            animation9Ref.fadeIn(3000);
                        }
                        return animation9Ref;
                    });
                });
            }, 3000);
        }


    }, [sceen, animation1]);
    

    return(
        <View style={tw`flex-1`}>
            
            <StatusBar hidden />

            <Video 
                style={tw`absolute top-0 left-0 right-0 bottom-0`}
                source={require("../assets/videos/walkingLoad.mp4")}
                resizeMode="cover"
                repeat={true}
                shouldPlay={true}
                isLooping={true}
            />
            <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50`}></View>
            <View style={tw`flex-1`}>
                <Animatable.Text ref={(ref) => setAnimation1(ref)} style={ sceen===1?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center`:tw`hidden`}>환영합니다.</Animatable.Text>
                <Animatable.Text ref={(ref) => setAnimation2(ref)} style={sceen===2?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center` :tw`hidden`}>{`저는 여러분의 숙면을 도와드릴\nsleep mate입니다.`}</Animatable.Text>
                <Animatable.Text ref={(ref) => setAnimation3(ref)} style={sceen===3?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center`:tw`hidden`}>몇 가지 질문을 드리겠습니다.</Animatable.Text>
                
                <Animatable.View ref={(ref) => setAnimation4(ref)} style={sceen===4?tw`absolute top-0 left-0 right-0 bottom-0`:`hidden`}>
                    <ClockPicker display={sceen}/>
                </Animatable.View>
                <ConfirmBtn display={sceen}/>
                <Animatable.Text ref={(ref) => setAnimation4(ref)} style={sceen===4?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center`:tw`hidden`}>평소 몇 시에 잠에 드시나요?</Animatable.Text>
                
                <DropDownTime display={sceen}/>
                <Animatable.Text ref={(ref) => setAnimation6(ref)} style={sceen===6?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center`:tw`hidden`}>평소 몇 시간 정도 잠을 자시나요?</Animatable.Text>
            
                <Animatable.Text ref={(ref) => setAnimation8(ref)} style={sceen===8?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center`:tw`hidden`}>대답 감사합니다.</Animatable.Text>

                <Animatable.Text ref={(ref) => setAnimation9(ref)} style={sceen===9?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5 mt-[${height}] text-center`:tw`hidden`}>{`sleep mate가\n행복한 수면 경험을 선사해드리겠습니다.`}</Animatable.Text>
            </View>
        </View>
    )
}

export default IntroExplain;