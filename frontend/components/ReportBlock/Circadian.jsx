import React, {useEffect, useState} from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Pressable } from 'react-native';
import sun from "../../assets/images/Sunny.png"
import tw from "twrnc"
import BottomSheetModal from './BottomSheetModal';
import { diagnosisDateState } from '../../recoil/date/diagnosisDate';
import { useRecoilState } from 'recoil';
import { nonAuthHttp } from '../../axios/axios';
import { userSeq } from '../../recoil/user/userAtom';
function Circadian(props) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [date, setDate] = useRecoilState(diagnosisDateState);
    const [rhythm, setRhythm] = useState(0);
    const [data, setData] = useState();
    const [memberSeq, setMemberSeq] = useRecoilState(userSeq);

    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };
    function getCircadian(){
        async function requestCircadian(){
            const send = {
                sleepDate : date,
                memberSeq : memberSeq,
            }
            console.log(date);
            try {
                const response = await nonAuthHttp.post(`api/watch/luxAndTime`, send);
                const response2 = await nonAuthHttp.post(`api/watch/rhythm`, send);
                console.log(response.data);
                console.log(response2.data.rhythm);
                setRhythm(response2.data.rhythm);
                setData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        requestCircadian()
    }

    useEffect(()=>{
        setData(null);
        getCircadian();
    
    },[date])
    function renderMsg(){
        switch(rhythm){
            case 0 :
                return (
                    <>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>건강한 생체리듬은 아침시간의 밝은 빛 노출과 관련이 있습니다.</Text>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight `}>기상 시 주변이 밝아지도록 환경을 조성해보세요.</Text>
                    </>
                )
            case 1:
                return (
                    <>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>일주기 리듬에 주의가 필요합니다.</Text>
                    </>
                )
            case 2:
                return (
                    <>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>일주기 리듬에 적절한 수면을 하고 계십니다.</Text>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>기상 시 보다 밝은 환경으로 건강한 생체리듬에 기여해보세요.</Text>
                    </>
                )
            case 3:
                return (
                    <>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>일주기 리듬에 적절한 수면을 하고 계십니다.</Text>
                    <Text style={tw `text-[3.2] text-[#ccc] tracking-tight leading-5`}>기상 시 밝은 환경으로 건강한 생체리듬에 기여하고 계시네요!</Text>
                    </>
                )
        }
    
    }
    if(!data){
        return (
            <>
                <Text>Loading...</Text>
            </>
        )
    } else {
        return (
            <>
            <View style={tw `flex-1 w-full bg-[#333] rounded-7 p-3 mb-6`}>
                        {/* header */}
                        <View style={tw `flex-1 flex-row`}>
                            <View style={tw `flex-2 `}>
                                <Text style={tw `text-lg text-[#fff] font-bold text-[4]`}>나의 일주기 리듬</Text>
                                {/* <Text style={tw `text-lg text-[#fff] font-bold text-[4]`}>{date}</Text> */}
                            </View>
                            <Pressable style={tw `flex-1  justify-center`} onPress={toggleBottomSheet}>
                                <Text style={tw `text-[#ccc] text-xs`}>&#62; more</Text>
                            </Pressable>
                            <View style={tw `flex-1  items-end`}>
                                <View style={tw `rounded-1.5 w-15 p-1.5 bg-[#A897BF]/50 items-center justify-center`}><Text style={tw `text-[#fff] font-bold`}>정상</Text></View>
                            </View>
                        </View>
                        {/* body */}
                        <View style={tw `flex-2 flex-row p-2 my-3`}>
                            <View style={tw `flex-2  items-center p-0`}>
                                <Image source={sun} style={tw `h-11 mb-1`}></Image>
                                <Text style={tw `text-[#fff] text-[2.5] font-bold -mb-1`}>기상 시 조도</Text>
                                <Text style={tw `text-[#fff] text-base font-bold`}>{data.lux} Lux</Text>
                            </View>
                            <View style={tw `flex-1  justify-center mt-4`} onPress={()=>{console.log("hi")}}>
                                <Text style={tw `text-[#fff] text-xs font-bold mb-4`}>잠에 든 시간</Text>
                                <Text style={tw `text-[#fff] text-xs font-bold`}>깨어난 시간</Text>
                            </View>
                            <View style={tw `flex-1  items-start justify-center mt-4`}>
                                <Text style={tw ` text-[#fff] text-base font-bold mb-2`}>{data.startTime.slice(11,16)}</Text>
                                <Text style={tw ` text-[#fff] text-base font-bold`}>{data.endTime.slice(11,16)}</Text>
                            </View>
                        </View>
                        {/* tail */}
                        <View style={tw `flex-1 items-center`}>
                            <View style={tw `rounded-2 border-[#ddd] border-[0.25] p-2 items-center w-full`}>
                                {renderMsg()}
                                
                            </View>
                        </View>
                    </View>
                    <BottomSheetModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} modalN={1} />
            </>
        );
    }
}

export default Circadian;