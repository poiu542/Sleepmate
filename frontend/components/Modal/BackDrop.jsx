import React, { useState, useRef, useEffect } from "react";
import { View, Button, Image, Text, ScrollView, Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import tw from "twrnc";
import { useRecoilState} from 'recoil';
import {motionModalState} from '../../recoil/modal/motionModalAtom';
import { motionDescState } from "../../recoil/modal/motionDescAtom";

// 예시 이미지
import ex_forward from '../../assets/motion/ex_forward.png';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

const BackDrop = () => {
  const [modalVisible, setModalVisible] = useRecoilState(motionModalState);
  const [motionDesc, setMotionDesc] = useRecoilState(motionDescState);

  const refRBSheet = useRef();

  useEffect(()=>{
    if(modalVisible){
        refRBSheet.current.open();
    }
  },[modalVisible])


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
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
          container:{
            borderRadius:20
          }
        }}
      >
        <View style={tw`mt-5`}>
            <Text style={tw`text-xl font-bold p-5 text-black`}>
              {motionDesc.type===1?"FW(Forward) 바른자세":null}
            </Text>
        </View>

        <View style={{ width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center', marginTop:50 }}>
          <Image source={ex_forward} resizeMode="contain" style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH}} />
        </View>

      </RBSheet>
    </View>
  );
}

export default BackDrop