import * as React from 'react';
import { Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const ConfirmBtn = ({display}) => {
    console.log(display);

    const width = Dimensions.get("window").width/2-150;
    const height = Dimensions.get("window").height-300;

    return (
        <>
            {display===4?<TouchableOpacity>
                <View style={tw`absolute justify-center items-center w-75 h-15 bg-gray-400 rounded ml-[${width}] mt-[${height}] p-8`}>
                    <Text style={tw`text-xl h-6 text-white font-bold`}>응답 완료</Text>
                </View>
            </TouchableOpacity>:null}
        </>
    );
}


export default ConfirmBtn;