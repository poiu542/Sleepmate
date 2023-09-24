import {View, ScrollView, Dimensions, StyleSheet} from "react-native";
import { useState } from "react";
import { Video } from "expo-av";
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";
import {LinearGradient} from 'expo-linear-gradient';

// 컴포넌트
import CalendarHorizontal from "../components/Calendar/CalendarHorizontal";

const Analysis = () => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height-500;

    const [selectedDate, setSelectedDate] = useState(null);

    return(
        <View style={tw`flex-1`}>
            <Video 
                style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-50`}
                source={require("../assets/videos/sunrise.mp4")}
                resizeMode="cover"
                repeat={true}
                shouldPlay={true}
                isLooping={true}
            />

            <ScrollView style={tw`pt-50 `}>
                <LinearGradient
                    colors={['white' , 'white' ]} // Define your gradient colors
                    start={{ x: 0, y: 0.1 }} // Gradient start point
                    end={{ x: 0, y: 1 }} // Gradient end point
                    style={tw`rounded-2xl p-5 py-9 shadow-2xl w-full h-[${height}] self-center`} 
                >

                    <View style={styles.container}>
                        <CalendarHorizontal onSelectDate={setSelectedDate} selected={selectedDate} />
                        <StatusBar style="auto" />
                    </View>
    
                </LinearGradient>
            </ScrollView>

        </View>

    )
}

export default Analysis

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });