import {View, ScrollView, Dimensions, Text} from "react-native";
import { Video } from "expo-av";
import tw from "twrnc";
import {LinearGradient} from 'expo-linear-gradient'

const Analysis = () => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

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

                <ScrollView style={tw`pt-50`}>
                    <LinearGradient
                        colors={['#00ff0000','#FFFFE0','#FFFFFF' ]} // Define your gradient colors
                        start={{ x: 0, y: 0 }} // Gradient start point
                        end={{ x: 0, y: 1 }} // Gradient end point
                        style={tw`rounded-2xl p-5 py-9 shadow-2xl w-full h-[${height}] self-center`} 
                    >
                        <Text>산하님,</Text>
                        <Text>Good Morning</Text>
                    </LinearGradient>
                </ScrollView>


        </View>

    )
}

export default Analysis