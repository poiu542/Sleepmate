import React, { useState, useRef, useEffect } from "react";
import { View, Button, Image, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import tw from "twrnc";
import { useRecoilState} from 'recoil';
import {motionModalState} from '../../recoil/modal/motionModalAtom';

// 예시 이미지
import ex_forward from '../../assets/motion/ex_forward.png';

const BackDrop = () => {
  const [modalVisible, setModalVisible] = useRecoilState(motionModalState);
  
  const refRBSheet = useRef();

  useEffect(()=>{
    if(modalVisible){
        console.log(1);
        refRBSheet.current.open();
    }
  },[modalVisible])


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      {/* <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} /> */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={600}
        onClose={()=>setModalVisible(false)}
        customStyles={{
          wrapper: {

            backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% 투명한 검은색 배경
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
        }}
      >
        <View style={tw`bg-[#091B35] mt-5`}>
            <Text style={tw`text-xl font-bold p-5 text-white`}>바른 자세형</Text>
        </View>
        <View style={tw`flex-row justify-between mt-5 ml-5`}>
            <Image source={ex_forward} resizeMode="contain" style={tw`flex-1 w-full h-100`}></Image>
        </View>
      </RBSheet>
    </View>
  );
}

export default BackDrop