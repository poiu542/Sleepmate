import React, {useState} from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import sun from "../../assets/images/Sunny.png"
import {LinearGradient} from 'expo-linear-gradient';
import tw from "twrnc"
import BottomSheetModal from './BottomSheetModal';
function Rem(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [status, setStatus] = useState('low'); // Adjust the status as needed
    const [normal, setNormal] = useState(true);
    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };
    const renderLever = () => {
        let leverPositionStyle;
    
        switch (status) {
            case 'high':
                leverPositionStyle = { right: "15%" };
                // setNormal(false);
                break;
            case 'middle':
                leverPositionStyle = { right: '37%'};
                // setNormal(true);
                break;
            case 'low':
                leverPositionStyle = { left: "15%" };
                // setNormal(true);
                break;
            default:
                leverPositionStyle = {};
        }
    
        return (
            <View style={[tw`rounded-full bg-white w-4.5 h-4.5 absolute -top-0`, leverPositionStyle]} />
        );
    };
    return (
        <>
        <View style={tw `flex-1 w-full bg-[#333] rounded-7 p-3 mb-6`}>
                    {/* header */}
                    <View style={tw `flex-1 flex-row`}>
                        <View style={tw `flex-2`}>
                            <Text style={tw `text-[4] text-[#fff] font-bold`}>렘 수면 행동</Text>
                        </View>
                        <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                            <Text style={tw `text-[#ccc] text-xs`}>&#62; more</Text>
                        </Pressable>
                        {
                            normal? 
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
                       <Text style={tw `flex-1 text-[3.8] font-bold text-[#fff] my-2`}>수면 시 움직임</Text>
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
                            <Text style={tw `text-[3.2] text-[#ccc] tracking-tight`}>수면 시 과도한 움직임이 관찰됩니다</Text>
                        </View>
                    </View>
                </View>
                <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={3} />
        </>
    );

}

export default Rem;
