import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

//recoil
import { useRecoilState } from 'recoil';
import { wakeupMusicState } from '../../recoil/timerAlarm/wakeupMusictAtom';


const AlarmTimer = () => {

    const [alarm, setAlarm] = useRecoilState(wakeupMusicState);

  useEffect(() => {
    const timer = setTimeout(() => {
        console.log("ring a bell!");
      setAlarm(true);
      Alert.alert('Good Morning!!');
    }, 10000);

    // 타이머 클리어를 위해 컴포넌트가 언마운트될 때 clearTimeout 호출
    return () => clearTimeout(timer);
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <View>
      <Text>---</Text>
    </View>
  );
};

export default AlarmTimer;