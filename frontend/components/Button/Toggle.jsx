import React, { useEffect } from 'react';
import Switch from 'react-native-switch-toggles';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

const Toggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Item
        renderContent={() => (
          <>
            <Switch
              value={isEnabled}
              onChange={(value) => setIsEnabled(value)}
              activeTrackColor={'#45D058'}
              renderOffIndicator={() => (
                <Text style={{ fontSize: 8, color: 'white' }}>OFF</Text>
              )}
              renderOnIndicator={() => (
                <Text style={{ fontSize: 8, color: 'white' }}>ON</Text>
              )}
            />
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default Toggle

const Item = ({ renderContent }) => {
  return <View style={styles.item}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17191A',
  },
  item: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#242627',
    marginVertical: 2,
  },
  label: {
    color: '#ffffff',
  },
});