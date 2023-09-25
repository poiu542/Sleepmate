import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import Sleep from '../screens/Sleep';
import Report from '../screens/Report';
import Diagnosis from '../screens/Diagnosis';
import {Ionicons} from '@expo/vector-icons';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Text, Pressable, View, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
const MainTab = createBottomTabNavigator();

const MainRightButtons = ({navigation}) => {
  return (
    <>
    <View style={tw `flex-row`}>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{navigation.navigate("InviteFriends")}}>
      <Ionicons name="person-add" size={20.5} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>동행추가</Text></View>
      </Pressable>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{Alert.alert("로그아웃 하시겠습니까?")}}>
      <MaterialCommunityIcons name="airplane-landing" size={22} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>정산하기</Text></View>
      </Pressable>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{Alert.alert("로그아웃 하시겠습니까?")}}>
      <Feather name="log-out" size={22} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>로그아웃</Text></View>
      </Pressable>
    </View>
    </>
  )
};

//메인화면 버튼 컴포넌트
const MainButton = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="home" size={26} color="black" />
  </Pressable>
  )
};
const MainTabNavigator = () => {
    return (
      <MainTab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarLabel: ({ focused, color }) => {
            let label;
  
            if (route.name === 'Sleep') {
              label = '잠';
            } else if (route.name === 'Report') {
              label = '리포트';
            } else if (route.name === 'Diagnosis') {
              label = '수면진단';
            } 
  
            return (
              <Text
                style={[
                  tw `text-[2.6]`,
                  { color: focused ? '#2695B1' : '#999' }, // Change text color based on focus
                ]}
              >
                {label}
              </Text>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Sleep') {
              iconName = focused ? 'card' : 'card-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'document' : 'document-outline';
            } else if (route.name === 'Diagnosis') {
              iconName = focused ? 'gift' : 'gift-outline';
            } 
  
            // You can customize the icon's appearance here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor : "#2695B1",
          tabBarInactiveTintColor : "#999",
        })}
      >
        <MainTab.Screen name="Sleep" component={Sleep} />
        <MainTab.Screen name="Diagnosis" component={Diagnosis} />
        <MainTab.Screen name="Report" component={Report}/>
      </MainTab.Navigator>
    );
  };

export default MainTabNavigator;