import React, { useEffect, useRef, useState } from 'react';
import {View, Text, TextInput, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { StatusBar } from "expo-status-bar";
import tw from 'twrnc'


const UserSetting = () => {
    const widthInput = Dimensions.get("window").width/2-150;
    const heightInput = Dimensions.get("window").height-500;

    const [cm, setCm] = useState(175);
    const [kg, setKg] = useState(60);
    const [bmi, setBmi] = useState(0);

    useEffect(()=>{
        let newBMI = (kg/((cm/100)*(cm/100))).toFixed(2);
        setBmi(newBMI);
    },[cm, kg])
    
    return(

    <View style={tw`flex-1 bg-black w-full h-full`}>
      <ScrollView>

        <View style={tw`bg-black justify-center items-center mb-20 w-full h-[900px]`}>
            <StatusBar style="light" />
            

            <View style={tw`absolute bg-[#323232] rounded-xl w-[350px] h-[250px] mt-30 top-[3%]`}>
              <Text style={tw`flex-1 text-white p-8 text-5 font-black`}>신체 정보</Text>
              <View style={tw`flex-1 flex-row z-10 p-8 mt--15 items-center`}>
                <TextInput
                        editable
                        multiline={false}
                        keyboardType='decimal-pad'
                        returnKeyType="done"
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
                        defaultValue={cm}
                        style={tw`bg-[#00ff0000] text-white rounded-xl w-60 h-15 p-5`}
                        borderWidth={1}
                        borderColor="white"
                    />
                    <Text style={tw`text-white text-5`}>  cm</Text>
              </View>


              <View style={tw`flex-1 flex-row z-10 p-8 mt--10 items-center`}>
                <TextInput
                    editable
                    multiline={false}
                    keyboardType='number-pad'
                    returnKeyType="done"
                    value={kg}
                    onChangeText={(data) => setKg(data)}
                    onPress={console.log(kg)}
                    placeholder={'몸무게(kg)'}
                    placeholderTextColor={"white"}
                    defaultValue={kg}
                    style={tw`bg-[#00ff0000] text-white rounded-xl w-60 h-15 p-5`}
                    borderWidth={1}
                    borderColor="white"
                />
                <Text style={tw`text-white text-5`}>  kg</Text>
              </View>
            </View>


            <View style={tw`absolute bg-[#323232] rounded-xl w-[350px] h-[250px] mt-30 top-[35%]`}>
                <Text style={tw`flex-1 text-white p-8 text-5 font-black`}>BMI</Text>

                <View style={tw`flex-1 flex-row text-white p-8 text-5 font-black items-center justify-center`}>
                    <Text style={tw`text-white p-5 text-15 text-center font-black text-[#FFF1D4] mt--20`}>{bmi}</Text>
                    <Text style={tw`text-white text-5 text-center font-black text-[#FFF1D4] mt--20`}>kg/㎡</Text>

                </View>
                {
                    bmi<=18.5?<Text style={tw`flex-1 text-white p-5 text-4 text-center font-black text-white mt--10`}>원준님은 저체중 범위의 BMI 지수입니다.</Text>
                    :(bmi<=22.9?<Text style={tw`flex-1 text-white p-5 text-4 text-center font-black text-white mt--10`}>원준님은 정상 범위의 BMI 지수입니다.</Text>
                    :(bmi<=24.9?<Text style={tw`flex-1 text-white p-5 text-4 text-center font-black text-white mt--10`}>원준님은 정상 범위의 BMI 지수입니다.</Text>
                    :<Text style={tw`flex-1 text-white p-5 text-4 text-center font-black text-white mt--10`}>원준님은 비만 범위의 BMI 지수입니다.</Text>))
                }
                
            </View>

            <View style={tw `absolute top-[90%] w-80`}>
                <TouchableOpacity onPress={()=>{navigate.navigate("Home")}} style={tw `border-white border-[0.3] rounded-2 h-13 items-center justify-center`}>
                    <Text style={tw `text-white text-lg`}>회원 탈퇴</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
      </View>
    )
}

export default UserSetting;