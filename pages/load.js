import React, {Component} from 'react';

import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';

export class loader extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
