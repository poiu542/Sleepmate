import {View, Text, Image} from 'react-native'
import tw from 'twrnc';

// 이미지
import alarm_bell from '../../assets/alarm/data_alarm.png';

const SleepMotionPercent = () => {
    return(
        <View 
            style={tw`flex-row w-full h-[60px] bg-[#091B35] rounded-50 items-center justify-center mt-10`}>
            <Image style={tw`w-7 h-7  mr-3`} source={alarm_bell}/>
            <Text style={tw`text-white text-[15px] text-center font-bold`}>
                산하님은 1유형입니다.
            </Text>
        </View>
    )

}

export default SleepMotionPercent