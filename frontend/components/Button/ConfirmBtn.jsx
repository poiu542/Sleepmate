import * as React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

// recoil
import {useRecoilState} from "recoil";
import {sceenNumberState} from '../../recoil/intro/sceenNumberAtom';

const ConfirmBtn = ({display, saveBioInfo}) => {
    console.log(display);

    const [sceen, setSceen] = useRecoilState(sceenNumberState);

    const width = Dimensions.get("window").width/2-150;
    const height = Dimensions.get("window").height-300;

    return (
        <>
            {
            display===4 || display===6 ?
                <TouchableOpacity onPress={()=>setSceen(sceen+1)}>
                    <View style={tw`absolute justify-center items-center w-75 h-15 bg-[#FFE500]/40 rounded ml-[${width}] mt-[${height}] p-8 rounded-4`}>
                        <Text style={tw`text-[4.2] h-6 text-[#fff] font-bold`}>응답 완료</Text>
                    </View>
                </TouchableOpacity>
                :
                display === 8?
                <TouchableOpacity onPress={()=>{saveBioInfo(); setSceen(sceen+1);}}>
                    <View style={tw`absolute justify-center items-center w-75 h-15 bg-[#FFE500]/40 rounded ml-[${width}] mt-[${height}] p-8 rounded-4`}>
                        <Text style={tw`text-[4.2] h-6 text-[#fff] font-bold`}>응답 완료</Text>
                    </View>
                </TouchableOpacity>
                :
                null
            }
        </>
    );
}


export default ConfirmBtn;