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
              placeholder="배경선택"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              onChangeValue={changeValue}
              zIndex={3000}
              zIndexInverse={1000}
              showArrowIcon={false}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:"absolute",
    width:"100%",
    height:"50px",
  },
  input: {
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  placeholderStyles: {
    color: "white",
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
    zIndex:30,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
    zIndex:30,
    backgroundColor:"transparent",
  },
  getStarted: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
  },
});

export default BackGroundPick;