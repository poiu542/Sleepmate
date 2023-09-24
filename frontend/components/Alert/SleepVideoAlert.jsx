import {View, Text, Image} from 'react-native';
import tw from 'twrnc';

// 이미지
import video_alarm from '../../assets/alarm/video_alarm.png';

const SleepVideoAlert = () => {
    return(
        <View 
            style={tw`flex-row w-full h-[60px] bg-[#091B35] rounded-50 items-center justify-center mt-10`}>
              <Image style={tw`w-10 h-10  mr-3`} source={video_alarm}/>
              <Text style={tw`text-white text-[15px] text-center font-bold`}>
                  5번의 자세 변화가 있었습니다.
              </Text>
        </View>
    )
}

export default SleepVideoAlert