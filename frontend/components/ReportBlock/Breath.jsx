import React from 'react';
import {useState} from "react"
import { Text, View, ImageBackground, Image, ScrollView, Pressable } from 'react-native';
import sun from "../../assets/images/Sunny.png"
import tw from "twrnc"
import BottomSheetModal from './BottomSheetModal';
function Breath(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };
    return (
        <>
        <View style={tw `flex-1 w-full bg-[#333] rounded-7 p-3 mb-6`}>
                    {/* header */}
                    <View style={tw `flex-1 flex-row`}>
                        <View style={tw `flex-2 `}>
                            <Text style={tw `text-lg text-[#fff] font-bold text-[4]`}>심박수 안정도</Text>
                        </View>
                        <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                            <Text style={tw `text-[#ccc] text-xs`}>&#62; more</Text>
                        </Pressable>
                        <View style={tw `flex-1  items-end`}>
                            <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#A897BF]/50 items-center justify-center`}><Text style={tw `text-white font-bold`}>정상</Text></View>
                        </View>
                    </View>
                    {/* body */}
                    <View style={tw `flex-2 flex-row p-2 my-3`}>
                        
                    </View>
                    {/* tail */}
                    <View style={tw `flex-1 items-center`}>
                        <View style={tw `rounded-2 border-[#ddd] border-[0.25] p-2 items-center w-full`}>
                            <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>수면 무호흡이 의심될 시 똑바로 누운 자세는 좋지 않습니다.</Text>
                            <Text style={tw `text-[3.2] text-[#ccc] tracking-tight`}>옆으로 눕거나 엎드린 자세를 권장드립니다.</Text>
                        </View>
                        <Text style={tw `text-[#ccc] text-[2.1] mt-1 tracking-tighter`}>* 수면 무호흡증은 심박수 만으로 판단할 수 없습니다. 정확한 진단을 위해 의사를 방문해주세요.</Text>
                    </View>
                </View>
                <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={2} />
        </>
    );
}

export default Breath;