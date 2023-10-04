import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation.jsx';
import { RecoilRoot } from 'recoil';


export default function App() {
  return (
    <RecoilRoot>
      <AppNavigation />
      <StatusBar statusBarStyle={"light-content"} />
    </RecoilRoot>
  );
}
