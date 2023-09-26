import React, {useState} from 'react';
import { Text, View, Button, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

// recoil
import {useRecoilState} from "recoil";
import {sceenNumberState} from '../../recoil/intro/sceenNumberAtom';

const DropDownTime = ({display}) => {
    console.log(display);

    const [sceen, setSceen] = useRecoilState(sceenNumberState);

    const width = Dimensions.get("window").width/2-150;
    const height = Dimensions.get("window").height-600;

    const [selected, setSelected] = React.useState("");
    const [categories, setCategories] = React.useState([]);

    const [pick, setPick] = useState(0);




    return (
        <>

            {
                display===6?
                <View style={tw`w-[300px] h-[250px] ml-[${width}] mt-[${height}] rounded-xl`}>
                    <View style={tw`absolute w-full h-full bg-black rounded-xl opacity-70`}></View>
                    <ScrollView>
                        <TouchableOpacity onPress={()=>setPick(12)} style={pick===12?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>12시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(11)} style={pick===11?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>11시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(10)} style={pick===10?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>10시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(9)} style={pick===9?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>9시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(8)} style={pick===8?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>8시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(7)} style={pick===7?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>7시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(6)} style={pick===6?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>6시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(5)} style={pick===5?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>5시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(4)} style={pick===4?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>4시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(3)} style={pick===3?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>3시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(2)} style={pick===2?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>2시간</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPick(1)} style={pick===1?tw`w-full h-20 items-center justify-center bg-green-500 rounded-xl`:tw`w-full h-20 items-center justify-center`}><Text style={tw`text-white`}>1시간</Text></TouchableOpacity>
                    </ScrollView>


                </View>:null
            }
        </>
    );
}


export default DropDownTime;