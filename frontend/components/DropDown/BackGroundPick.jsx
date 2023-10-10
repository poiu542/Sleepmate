import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

// recoil
import {useRecoilState} from "recoil";
import {sleepBackState} from '../../recoil/sleepBack/sleepBackAtom';

const BackGroundPick = () => {

  const [back, setBack] = useRecoilState(sleepBackState);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState("Starry Night");
  const [gender, setGender] = useState([
    { label: "Starry Night", value:1 },
    { label: "Rain", value: 2 },
  ]);

  const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };

  const changeValue = (value) => {
    setBack(value);
    console.log(back);
  }


  return (
    <View style={styles.container}>
      <Controller
        name="gender"
        defaultValue="Starry"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownGender}>
            <DropDownPicker
              style={styles.dropdown}
              open={genderOpen}
              value={genderValue} //genderValue
              items={gender}
              setOpen={setGenderOpen}
              setValue={setGenderValue}
              setItems={setGender}
              placeholder="Starry Night"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              onChangeValue={changeValue}
              showArrowIcon={false}
              dropDownContainerStyle={{backgroundColor: 'transparent', borderColor:"white"}}
              listItemLabelStyle={{ color: 'white' }}
              labelStyle={{ color: 'white' }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:"absolute",
    width:"100%",
    height:"50px",
  },
  placeholderStyles: {
    color: "white",
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "white",
    height: 50,
    backgroundColor:"transparent",
  },
});

export default BackGroundPick;