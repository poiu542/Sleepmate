import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation.jsx';
import {
  RecoilRoot,
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      {/* <StatusBar style="light"/> */}
      {/* <TabNavigation></TabNavigation> */}
      <AppNavigation>
      </AppNavigation>
    </RecoilRoot>
  );
}

