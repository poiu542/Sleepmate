import * as React from 'react';
import { Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'

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
    
    const data = [
        {key:12, value:'12시간'},
        {key:11, value:'11시간'},
        {key:10, value:'10시간'},
        {key:9, value:'9시간'},
        {key:8, value:'8시간'},
        {key:7, value:'7시간'},
        {key:6, value:'6시간'},
        {key:5, value:'5시간'},
        {key:4, value:'4시간'},
        {key:3, value:'3시간'},
        {key:2, value:'2시간'},
        {key:1, value:'1시간'},
    ]

    return (
        <>
            {display===5? 
            <View style={tw`w-75 mt-[${height}] bg-white opacity-80 rounded-xl ml-[${width}]`}>
                <SelectList style={tw`flex-1`} setSelected={setSelected} data={data}  />
            </View>:null}
        </>
    );
}


export default DropDownTime;