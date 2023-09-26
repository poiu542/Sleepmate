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
import Analysis from '../screens/Analysis';
const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
      <MainTab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarLabel: ({ focused, color }) => {
            let label;
  
            if (route.name === 'Sleep') {
              label = '잠';
            } else if (route.name === 'Analysis') {
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
            } else if (route.name === 'Analysis') {
              iconName = focused ? 'document' : 'document-outline';
            } else if (route.name === 'Diagnosis') {
              iconName = focused ? 'gift' : 'gift-outline';
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor : "#2695B1",
          tabBarInactiveTintColor : "#999",
        })}
      >
        <MainTab.Screen name="Sleep" component={Sleep} />
        <MainTab.Screen name="Diagnosis" component={Diagnosis} />
        <MainTab.Screen name="Analysis" component={Analysis}/>
      </MainTab.Navigator>
    );
  };

export default MainTabNavigator;
