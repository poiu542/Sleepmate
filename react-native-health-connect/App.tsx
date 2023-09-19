import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, } from 'react-native';
import useHealthData from './src/hooks/useHealthData';

export default function App() {
  const {steps, distance, sleepSession} = useHealthData();

	console.log(`Steps: ${steps} | Distance: ${distance}m | SleepSession: ${sleepSession}`);

  return (
    <View style={styles.container}>
      <TextInput value={steps.toString()} />
      <TextInput value={`${(distance / 1000).toFixed(2)} km`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
