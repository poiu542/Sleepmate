import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, View, Text, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import tw from "twrnc";


// 화면 import
import IntroExplane from "../screens/IntroExplain";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Home from "../screens/Home"
import Camera from '../screens/Camera';
import Test from '../screens/Test';


// 상단 네비게이션 버튼 컴포넌트 모음

//홈 버튼 컴포넌트
const MainButton = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="home" size={26} color="black" />
  </Pressable>
  )
};

//뒤로가기 버튼 화살표 컴포넌트
const BackButton = () => {
  const navigation = useNavigation();
  return (
  <Pressable onPress={()=>{navigation.goBack()}}>
  <Entypo name="chevron-thin-left" size={24} color="black" />
  </Pressable>
  )
};

//취소 버튼 x 컴포넌트
const CancelButton = () => {
  const navigation = useNavigation();
  return (
  <Pressable onPress={()=>{navigation.goBack()}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};

//취소버튼 컴포넌트
const CancelCreateAccountButton = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};
const CancelInviteButton = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MainTabNavigator")}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};


//네비게이션 우측 버튼들 예시
// const MainRightButtons = ({navigation}) => {


//   return (
//     <>
//     {modalVisible.open&&<View style={tw`-z-50`}><TwoBtnModal modalTitle='정산' content={`정산하시겠습니까?\n동행통장 기록이 종료됩니다.`}/></View>}
//     <View style={tw `flex-row`}>
//       <Pressable style={tw `ml-3 items-center`} onPress={()=>{navigation.navigate("InviteFriends")}}>
//       <Ionicons name="person-add" size={20.5} color="black" />
//       <View><Text style={tw `text-xs tracking-tighter`}>동행추가</Text></View>
//       </Pressable>
//       <Pressable style={tw `ml-3 items-center`} 
//         onPress={()=>{setModalVisible({open:true, event:false})}}
//       >
//       <MaterialCommunityIcons name="airplane-landing" size={22} color="black" />
//       <View><Text style={tw `text-xs tracking-tighter`}>정산하기</Text></View>
//       </Pressable>
//       <Pressable style={tw `ml-3 items-center`} onPress={()=>{Alert.alert("로그아웃 하시겠습니까?")}}>
//       <Feather name="log-out" size={22} color="black" />
//       <View><Text style={tw `text-xs tracking-tighter`}>로그아웃</Text></View>
//       </Pressable>
//     </View>
//     </>
//   )
// };


//실제 연결 시작
//다영언니  home 페이지로 잡기
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Camera' component={Camera} options={{headerShown:false}} />
        <Stack.Screen name='Test' component={Test} options={{headerShown:false}} />
        <Stack.Screen name='IntroExplane' component={IntroExplane} options={{headerShown:false}} />

        {/* <Stack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator} // Use MainTabNavigator as the component
            options={{
              headerTitle: '',
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerLeft: () => <MainButton navigation={useNavigation()} />,
              headerRight: () => <MainRightButtons navigation={useNavigation()} />,
            }}
          /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
