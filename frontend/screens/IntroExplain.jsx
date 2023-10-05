import { StatusBar } from "expo-status-bar";
import {Text, View, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from "react";
import { Video, Audio } from "expo-av";
import tw from "twrnc";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { userSeq } from "../recoil/user/userAtom";
import { nonAuthHttp } from "../axios/axios";

// 컴포넌트
import ClockPicker from "../components/Clock/ClockPicker";
import ConfirmBtn from "../components/Button/ConfirmBtn";
import DropDownTime from "../components/DropDown/DropDownTime";

// recoil
import {useRecoilState} from "recoil";
import {sceenNumberState} from '../recoil/intro/sceenNumberAtom';

// 음악
import volumeUp from '../assets/sounds/volumeUp.png';
import mute from '../assets/sounds/mute.png';

const IntroExplain = () => {

    const [animation1, setAnimation1] = useState(null);
    const [animation2, setAnimation2] = useState(null);
    const [animation3, setAnimation3] = useState(null);
    const [animation4, setAnimation4] = useState(null);
    const [animation6, setAnimation6] = useState(null);
    const [animation8, setAnimation8] = useState(null);
    const [animation10, setAnimation10] = useState(null);
    const [animation11, setAnimation11] = useState(null);
    const [animation12, setAnimation12] = useState(null);

    const [sceen, setSceen] = useRecoilState(sceenNumberState);
    const [sound, setSound] = useState(null);


    const widthInput = Dimensions.get("window").width/2-150;
    const heightInput = Dimensions.get("window").height-500;
    const height = Dimensions.get("window").height-150;

    const [cm, setCm] = useState(null);
    const [kg, setKg] = useState(null);
    const [memberSeq, setMemberSeq] = useRecoilState(userSeq);
    const [sendBio, setSendBio] = useState(null);


    const saveBioInfo = () => {
        async function sendBioInfo(){
            const send = {
                memberSeq : memberSeq,
                weight : kg,
                height : cm
            }
            try {
                const response = await nonAuthHttp.post(`/api/member/body-info`, send);
                
            } catch (error) {
                console.log(error);
            }
        }
        sendBioInfo();
    }
    useEffect(()=>{
        saveBioInfo();
    }, [sendBio])

    //음악 재생
    async function playSound() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/introMusic30.mp3')
                );
                setSound(sound);
                await sound.playAsync();
                console.log('Audio played successfully');
            } else {
                console.error('Audio permission not granted');
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    async function stopSound() {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setSound(false);
          console.log('Audio stopped successfully');
        }
    }


    //효과음 재생
    async function playEffect() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/introEffect.mp3')
                );
                await sound.playAsync();
                console.log('Audio played successfully');
            } else {
                console.error('Audio permission not granted');
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    useEffect(()=>{
        //음악 처음 자동 시작
        if(sound==null) playSound();
    },[])


    const navigate = useNavigation()


    // 애니메이션 효과
    useEffect(() => {
        if (sceen===1 && animation1) {
            setTimeout(() => {
                animation1.fadeOut(1000).then(() => {
                    setAnimation2(animation2Ref => {
                        setSceen(2);
                        if (animation2Ref) {
                            animation2Ref.fadeIn(1000);
                        }
                        return animation2Ref;
                    });
                });
            }, 2000);
        }

        if (sceen===2 && animation1) {
            setTimeout(() => {
                animation2.fadeOut(1000).then(() => {
                    setSceen(3);
                    setAnimation3(animation3Ref => {
                        if (animation3Ref) {
                            animation3Ref.fadeIn(1000);
                        }
                        return animation3Ref;
                    });
                });
            }, 3000);
        }

        if (sceen===3 && animation1) {
            setTimeout(() => {
                animation3.fadeOut(0).then(() => {
                    setSceen(4);
                    setAnimation4(animation4Ref => { //평소 몇 시에 잠에 드시나요?
                        if (animation4Ref) {
                            playEffect();
                            animation4Ref.fadeIn(1000);
                        }
                        return animation4Ref;
                    });
                });
            }, 2000);
        }

        //sceen==4일땐 fade out 되면 안되니까 생략


        if (sceen===5 && animation1) {
            //sceen==4 없애고, sceen==5 질문 띄우기
            setTimeout(() => {
                animation4.fadeOut(1000).then(() => {
                    setSceen(6);
                    setAnimation6(animation6Ref => {//평소 몇 시간 정도 잠에 드시나요?
                        if (animation6Ref) {
                            playEffect();
                            animation6Ref.fadeIn(2000);
                        }
                        return animation6Ref;
                    });
                });
            }, 1000); 
        }

        //sceen==5일땐 fade out 되면 안되니까 생략

        if (sceen===7 && animation1) {

            setTimeout(() => {
                animation6.fadeOut(1000).then(() => {
                    setSceen(8);
                    setAnimation8(animation8Ref => {
                        if (animation8Ref) {
                            playEffect();
                            animation8Ref.fadeIn(2000);
                        }
                        return animation8Ref;
                    });
                });
            }, 1000);
        }

        if (sceen===9 && animation1) {
            setTimeout(() => {
                animation8.fadeOut(1000).then(() => {
                    setSceen(10);
                    setAnimation10(animation10Ref => {
                        if (animation10Ref) {
                            animation10Ref.fadeIn(1000);
                        }
                        return animation10Ref;
                    });
                });
            }, 1000);
        }

        if (sceen===10 && animation1) {
            setTimeout(() => {
                animation10.fadeOut(1000).then(() => {
                    setSceen(11);
                    setAnimation11(animation11Ref => {
                        if (animation11Ref) {
                            animation11Ref.fadeIn(1000);
                        }
                        return animation11Ref;
                    });
                });
            }, 2000);
        }

        if (sceen===11 && animation1) {
            setTimeout(() => {
                animation11.fadeOut(1000).then(() => {
                    setSceen(12);
                    setAnimation12(animation12Ref => {
                        if (animation12Ref) {
                            animation12Ref.fadeOut(1000);
                        }
                        return animation12Ref;
                    });
                });
            }, 2000);
        }

        if (sceen===12 && animation1) {
            setTimeout(() => {
                stopSound();
                // 메인 페이지로 이동
                navigate.navigate("MainTabNavigator");
            }, 2000);
        }


    }, [sceen, animation1]);
    const [videoLoaded, setVideoLoaded] = useState(true);
    useEffect(() => {
        const loadVideo = async () => {
          const status = await Video.loadAsync(require("../assets/videos/walkingLoad.mp4"), {}, false);
          if (status.isLoaded) {
            setVideoLoaded(true);
          }
          console.log("test")
        };
    
        loadVideo();
      }, []);

    if(videoLoaded){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animatable.View ref={(ref) => setAnimation12(ref)} style={tw`flex-1 bg-black`}>
    
                <StatusBar hidden />
    
                <Video 
                    style={tw`absolute top-0 left-0 right-0 bottom-0`}
                    source={require("../assets/videos/walkingLoad.mp4")}
                    resizeMode="cover"
                    repeat={true}
                    shouldPlay={true}
                    isLooping={true}
                    ref={(ref) => setAnimation12(ref)}
                    onLoad={()=>{console.log("loaded")}}
                />
    
           
                <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50`}></View>
                <View style={tw`flex-1`}>
    
                    {/*  음악 관리 */}
                    {   sound!=false && sound!=null?
                        <TouchableOpacity style={tw`absolute mt-10 top-0 left-80 right-0 bottom-0 w-10 h-10 justify-center items-center z-10`} onPress={() => stopSound()}><Image source={volumeUp} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
                        :
                        <TouchableOpacity style={tw`absolute mt-10 top-0 left-80 right-0 bottom-10 w-10 h-10 justify-center items-center z-10`} onPress={() => playSound()}><Image source={mute} resizeMode="contain" style={tw`w-7 h-10`}></Image></TouchableOpacity>
                    }
                    <Animatable.Text ref={(ref) => setAnimation1(ref)} style={ sceen===1?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 font-bold mt-[${height}] text-center`:tw`hidden`}>환영합니다.</Animatable.Text>
                    <Animatable.Text ref={(ref) => setAnimation2(ref)} style={sceen===2?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 font-bold  mt-[${height}] text-center leading-7` :tw`hidden`}>{`저는 여러분의 숙면을 도와드릴\nsleep mate입니다.`}</Animatable.Text>
                    <Animatable.Text ref={(ref) => setAnimation3(ref)} style={sceen===3?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 font-bold mt-[${height}] text-center`:tw`hidden`}>몇 가지 질문을 드리겠습니다.</Animatable.Text>
                    
                    <Animatable.View ref={(ref) => setAnimation4(ref)} style={sceen===4?tw`absolute top-0 left-0 right-0 bottom-0`:`hidden`}>
                        <ClockPicker display={sceen}/>
                    </Animatable.View>
                    <ConfirmBtn display={sceen} saveBioInfo={saveBioInfo}/>
                    <Animatable.Text ref={(ref) => setAnimation4(ref)} style={sceen===4?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 font-bold mt-[${height}] text-center`:tw`hidden`}>평소 몇 시에 일어나세요?</Animatable.Text>
                    
                    <DropDownTime display={sceen}/>
                    <Animatable.Text ref={(ref) => setAnimation6(ref)} style={sceen===6?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 font-bold mt-[${height}] text-center`:tw`hidden`}>평소 몇 시간 정도 잠을 자시나요?</Animatable.Text>
                
                    {/* <TouchableOpacity style={tw`bg-red-500 w-100 h-100`} onPress={() => playSound()}></TouchableOpacity> */}
    
    
                    {sceen===8?<TextInput
                        editable
                        multiline={false}
                        keyboardType='decimal-pad'
                        value={cm}
                        onChangeText={(data) => setCm(data)}
                        onKeyPress={({ nativeEvent }) => {
                            // nativeEvent.key 에 눌린 키의 값을 가져옴
                            const keyPressed = nativeEvent.key;
                            // 입력된 키를 현재 값에 추가하여 화면에 표시
                            setCm((prevCm) => prevCm + keyPressed);
                        }}
                        placeholder={'키(cm)'}
                        placeholderTextColor={"white"}
                        // defaultValue={cm}
                        style={tw`bg-black opacity-70 text-white rounded-xl absolute top-0 left-0 right-0 bottom-0 w-75 h-15 ml-[${widthInput}] mt-[${heightInput}] p-5`}
                    />:null}
                    {sceen===8?<TextInput
                        editable
                        multiline={false}
                        keyboardType='number-pad'
                        value={kg}
                        onChangeText={(data) => setKg(data)}
                        onPress={console.log(kg)}
                        placeholder={'몸무게(kg)'}
                        placeholderTextColor={"white"}
                        defaultValue={kg}
                        style={tw`bg-black opacity-70 text-white rounded-xl absolute top-0 left-0 right-0 bottom-0 w-75 h-15 ml-[${widthInput}] mt-[${heightInput+80}] p-5`}
                    />:null}
                    <Animatable.Text ref={(ref) => setAnimation8(ref)} style={sceen===8?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 leading-7 mt-[${height}] text-center font-bold`:tw`hidden`}>{`키와 몸무게는 어떻게 되시나요?\nBMI검사에 활용됩니다.`}</Animatable.Text>
                    <Animatable.Text ref={(ref) => setAnimation10(ref)} style={sceen===10?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 font-bold mt-[${height}] text-center`:tw`hidden`}>감사합니다.</Animatable.Text>
                    <Animatable.Text ref={(ref) => setAnimation11(ref)} style={sceen===11?tw`absolute top-0 left-0 right-0 bottom-0 text-white text-5.2 leading-7 font-bold mt-[${height}] text-center`:tw`hidden`}>{`SleepMate가\n행복한 수면 경험을 선사해드리겠습니다.`}</Animatable.Text>
                </View>
            </Animatable.View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <ActivityIndicator
            style={tw`absolute top-0 left-0 right-0 bottom-0`}
            size="large"
            color="0000ff"
          />
        )
    }
}

export default IntroExplain;