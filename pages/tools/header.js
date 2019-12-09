import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export class ChildHeader extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require('../../img/CF_Alpha_NT.jpg')}
          style={styles.mainImg}
        />
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    alignItems: 'center',
  },
  mainImg: {
    width: 50,
    height: 50,
  },
});
