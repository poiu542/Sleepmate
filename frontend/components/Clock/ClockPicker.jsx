import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import { asPickerFormat } from './util/utils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from './util/values';
import TimePicker from './util/TimePicker';
import tw from 'twrnc';



const ClockPicker = ({display}) => {
    const [time, setTime] = React.useState(asPickerFormat(new Date()));
    const height = Dimensions.get("window").height-900;

    return (
        <>
            {display===4?<View style={tw`flex-1 items-center justify-center mt-[${height}] p-8`}>
                {/* <Text style={tw`text-white`}>{time.toTimeString()}</Text> */}
                <TimePicker
                    value={time}
                    onChange={setTime}
                    width={VIEW_WIDTH}
                    buttonHeight={BUTTON_HEIGHT} 
                    visibleCount={3}
                />
            </View>:null}
        </>
    );
}


export default ClockPicker;