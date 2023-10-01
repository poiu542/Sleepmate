import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import tw from "twrnc";

// recoil
// import {useRecoilState} from "recoil";
// import {sleepBackState} from '../../recoil/sleepBack/sleepBackAtom';

const SleepTerm = () => {

  const [time, setTime] = useState(0);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "12시간", value:12 },
    { label: "11시간", value:11 },
    { label: "10시간", value:10 },
    { label: "9시간", value:9 },
    { label: "8시간", value:8 },
    { label: "7시간", value:7 },
    { label: "6시간", value:6 },
    { label: "5시간", value:5 },
    { label: "4시간", value:4 },
    { label: "3시간", value:3 },
    { label: "2시간", value:2 },
    { label: "1시간", value:1 },
  ]);

  const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };


  return (
    <View style={[tw`flex-1 w-[100%] h-50 p-8`]}>
      <Controller
        name="gender"
        defaultValue="Starry"
        control={control}
        render={({ field: { onChange, value } }) => (
            // drop down style
          <View>
            <DropDownPicker
              style={tw`border-white bg-[#00ff0000]`}
              open={genderOpen}
              value={time} //genderValue
              items={gender}
              setOpen={setGenderOpen}
              setValue={setTime}
              setItems={setGender}
              placeholder="시간 선택"
              placeholderStyle={tw`bg-[#00ff0000] text-[#B7B7B7]`}
              onOpen={onGenderOpen}
              onChangeValue={setTime}
              zIndex={3000}
              zIndexInverse={1000}
              showArrowIcon={false}
              dropDownDirection="DOWN"
              dropDownContainerStyle={{backgroundColor: 'transparent', borderColor:"white",zIndex:100}}
              listItemLabelStyle={{ color: 'white', zIndex:"100" }}
              labelStyle={{ color: 'white' }}
            />
          </View>
        )}
      />

    
    </View>
  );
};

export default SleepTerm;