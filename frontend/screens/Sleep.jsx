import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

function Sleep() {

    const [text, setText] = useState('');
    const [speaking, setSpeaking] = useState(false);

    // 음성 인식 함수
    const startRecognition = async () => {
        try {
        const { status } = await Speech.requestPermissionsAsync();
        if (status === 'granted') {
            setSpeaking(true);
            const result = await Speech.recognizeAsync();
            if (result !== undefined) {
            setText(result.text);
            }
            setSpeaking(false);
        } else {
            console.error('음성 권한이 거부되었습니다.');
        }
        } catch (error) {
        console.error('음성 인식 중 오류 발생:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
            onPress={startRecognition}
            disabled={speaking}
            style={{
            backgroundColor: speaking ? 'gray' : 'blue',
            padding: 10,
            borderRadius: 5,
            }}
        >
            <Text style={{ color: 'white' }}>
            {speaking ? '음성 인식 중...' : '음성 인식 시작'}
            </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20 }}>{text}</Text>
        </View>
    );
}

export default Sleep;