import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export class ChildHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
              source={require('../../img/CF_Alpha_NT_grey.jpg')}
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
      paddingVertical: '.13rem',
  },
  mainImg: {
    height: 40,
    width: 40,
  },
  text: {
  },
  textContainer: {
  },
    lineStyle: {
        borderWidth: 3,
        borderColor: '#000285',
    },
});
