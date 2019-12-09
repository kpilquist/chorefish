import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class newChoreView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Example </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    alignItems: 'center',
  },
});
