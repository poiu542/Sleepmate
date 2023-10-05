import React, {useState, useEffect} from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import sun from "../../assets/images/Sunny.png"
import {LinearGradient} from 'expo-linear-gradient';
import tw from "twrnc"
import BottomSheetModal from './BottomSheetModal';
import { diagnosisDateState } from '../../recoil/date/diagnosisDate';
import { userSeq } from '../../recoil/user/userAtom';
import { useRecoilSnapshot, useRecoilState } from 'recoil';
import { nonAuthHttp } from '../../axios/axios';
function Rem(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [status, setStatus] = useState(null); // Adjust the status as needed
    const [normal, setNormal] = useState(true);
    const [date, setDate] = useRecoilState(diagnosisDateState);
    const [memberSeq, setMemberSeq] = useRecoilState(userSeq);
    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };
    const renderLever = () => {
        let leverPositionStyle;
    
        switch (status) {
            case 'high':
                leverPositionStyle = { right: "15%" };
                break;
            case 'middle':
                leverPositionStyle = { right: '37%'};
                break;
            case 'low':
                leverPositionStyle = { left: "15%" };
                break;
            default:
                leverPositionStyle = {};
        }
    
        return (
            <View style={[tw`rounded-full bg-white w-4.5 h-4.5 absolute -top-0`, leverPositionStyle]} />
        );
    };
    function getRem(){
        
        async function requestRem(){
            
            console.log("memberSeq"+memberSeq);
            const send = {
                sleepDate : date,
                memberSeq : memberSeq
            }
            console.log(date);
            try {
                const response = await nonAuthHttp.post(`api/posture/remSleepBehaviorDisorder`, send);
                console.log(response.data.disorderState);
                setStatus(response.data.disorderState);
                
            } catch (error) {
                console.log(error);
            }
        }
        requestRem();
    }
    useEffect(()=>{
        setStatus(null);
        getRem(); //데이터값 생김
    
    },[date])
    // useEffect(()=>{
    //     renderLever(); //데이터값 생김
    
    // },[status])
    if(!status){
        return (
            <>
                <View style={tw `flex-1 w-full bg-[#333] rounded-7 p-3 mb-6`}>
                        {/* header */}
                        <View style={tw `flex-1 flex-row`}>
                            <View style={tw `flex-2 `}>
                                <Text style={tw `text-lg text-[#fff] font-bold text-[4]`}>수면 시 움직임</Text>
                                {/* <Text style={tw `text-lg text-[#fff] font-bold text-[4]`}>{date}</Text> */}
                            </View>
                            <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                                <Text style={tw `text-[#ccc] text-xs`}>&#62; more</Text>
                            </Pressable>
                      
                        </View>
                        {/* body */}
                        <View style={tw `flex-2 flex-row p-2 my-3 self-center`}>
                            <Text style={tw `text-white py-5`}>...</Text>
                        </View>
                        {/* tail */}
                        <View style={tw `flex-1 items-center`}>
                        
                        </View>
                    </View>
                    <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={1} />

            </>
        )
    } else {
        return (
            <>
            <View style={tw `flex-1 w-full bg-[#333] rounded-7 p-3 mb-6`}>
                        {/* header */}
                        <View style={tw `flex-1 flex-row`}>
                            <View style={tw `flex-2`}>
                                <Text style={tw `text-[4] text-[#fff] font-bold`}>수면 시 움직임</Text>
                            </View>
                            <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                                <Text style={tw `text-[#ccc] text-xs`}>&#62; more</Text>
                            </Pressable>
                            {
                                status=="low" || status=="middle"? 
                                <View style={tw `flex-1  items-end`}>
                                    <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#A897BF]/50 items-center justify-center`}><Text style={tw `text-white font-bold`}>정상</Text></View>
                                </View>
                                    :
                                    <View style={tw `flex-1  items-end`}>
                                    <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#A45555]/80 items-center justify-center`}><Text style={tw `text-white font-bold`}>주의</Text></View>
                                </View>
                            }
                        </View>
                        {/* body */}
                        <View style={tw `flex-1 p-2 items-center my-5`}>
                           <Text style={tw `flex-1 text-[3.8] font-bold text-[#fff] my-2`}>Sleep Motion</Text>
                           {/* bar */}
                           <View style={tw `flex-2 flex-row m-2`}>
                                <Text style={tw `text-sm font-bold text-[#fff]`}>정상</Text>
                                <LinearGradient
                                colors={['#9D91FF', '#FF83A1']}  // Add your desired colors here
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ width: '60%', borderRadius: 2, height:8, margin:5, borderRadius:10, position:'relative'}}
                                >
                                {/* <View style={{ flex: 1 }} /> */}
                                </LinearGradient>
                                {/* <View style={tw `z-100 rounded-full bg-white w-4 h-4 absolute -top-1`}></View> */}
                                {renderLever()}
                                <Text style={tw `text-sm font-bold text-[#fff]`}>과다</Text>
                            </View>
                        </View>
                        {/* tail */}
                        <View style={tw `flex-1 items-center`}>
                            <View style={tw `rounded-2 border-[#ddd] border-[0.25] p-2 items-center w-full `}>
                                {
                                    status=="low"? 
                                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight`}>수면 시 과도한 움직임이 관찰되지 않습니다.</Text>
                                        :
                                        status=="middle"?
                                        <Text style={tw `text-[3.2] text-[#ccc] tracking-tight`}>수면 시 평균 이상의 움직임이 관찰되어 주의가 필요합니다.</Text>
                                        :
                                            <Text style={tw `text-[3.2] text-[#ccc] tracking-tight`}>수면 시 과도한 움직임이 관찰됩니다</Text>
                                }
                            </View>
                        </View>
                    </View>
                    <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={3} />
            </>
        );
    }

}

export default Rem;
