import React, {useState} from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Pressable } from 'react-native';
import sun from "../../assets/images/Sunny.png"
import tw from "twrnc"
import BottomSheetModal from './BottomSheetModal';
function Circadian(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };
    return (
        <>
        <View style={tw `flex-1 w-full bg-[#fff]/70 rounded-5 p-3 mb-4`}>
                    {/* header */}
                    <View style={tw `flex-1 flex-row`}>
                        <View style={tw `flex-2 `}>
                            <Text style={tw `text-lg text-[#333] text-[4]`}>나의 일주기 리듬</Text>
                        </View>
                        <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                            <Text style={tw `text-[#555] text-xs`}>&#62; more</Text>
                        </Pressable>
                        <View style={tw `flex-1  items-end`}>
                            <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#251751]/50 items-center justify-center`}><Text style={tw `text-white font-bold`}>정상</Text></View>
                        </View>
                    </View>
                    {/* body */}
                    <View style={tw `flex-2 flex-row p-2`}>
                        <View style={tw `flex-2  items-center p-0`}>
                            <Image source={sun} style={tw `h-11 mb-1`}></Image>
                            <Text style={tw `text-[#333] text-[2.5] font-bold -mb-1`}>기상 시 조도</Text>
                            <Text style={tw `text-[#222] text-base font-bold`}>50 Lux</Text>
                        </View>
                        <View style={tw `flex-1  justify-center mt-4`} onPress={()=>{console.log("hi")}}>
                            <Text style={tw `text-[#333] text-xs font-bold mb-4`}>잠에 든 시간</Text>
                            <Text style={tw `text-[#333] text-xs font-bold`}>깨어난 시간</Text>
                        </View>
                        <View style={tw `flex-1  items-start justify-center mt-4`}>
                            <Text style={tw ` text-[#333] text-base font-bold mb-2`}>23:50</Text>
                            <Text style={tw ` text-[#333] text-base font-bold`}>07:45</Text>
                        </View>
                    </View>
                    {/* tail */}
                    <View style={tw `flex-1 items-center`}>
                        <View style={tw `rounded-2 border-[#ddd] border-[0.25] p-1 items-center w-full`}>
                            <Text style={tw `text-[3.2] text-[#333] tracking-tight font-bold leading-5`}>일주기 리듬에 적절한 수면을 하고 계십니다.</Text>
                            <Text style={tw `text-[3.2] text-[#333] tracking-tight font-bold`}>기상 시 밝은 환경으로 건강한 생체리듬에 기여하고 계시네요!</Text>
                        </View>
                    </View>
                </View>
                <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={1} />
        </>
    );
}

export default Circadian;