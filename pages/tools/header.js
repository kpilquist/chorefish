import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export class ChildHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
            source={require('../../img/CF_Alpha_NT.jpg')}
            style={styles.mainImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  mainImg: {
    height: 40,
    width: 40,
  },
  text: {
  },
  textContainer: {
  },
});
