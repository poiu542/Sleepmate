//This is an example code to understand Switch//

import React from 'react';
import tw from 'twrnc';
//import react in our code.

import { Switch, Text, View, StyleSheet } from 'react-native';
//import all the components we are going to use.

export default class App extends React.Component {
  //Initial state false for the switch. You can change it to true just to see.
  state = { switchValue: true };

  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text
  };

  render() {
    return (
      <View style={styles.container}>
        {/*Text to show the text according to switch condition*/}
        <View style={tw`flex-row`}>
          <Text style={tw`text-white text-5`}>알람 </Text>
          <View style={tw`bg-green-50 rounded`}><Text style={tw`text-white text-5 text-[#008000]`}>{this.state.switchValue ? 'ON' : null}</Text></View>
          <View style={tw`bg-red-50 rounded`}><Text style={tw`text-white text-5 text-[#ff0000]`}>{!this.state.switchValue ? 'OFF' : null}</Text></View>
        </View>

        {/*Switch with value set in constructor*/}
        {/*onValueChange will be triggered after switch condition changes*/}
        <Switch
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft:20,
    marginRight:20,
  },
});