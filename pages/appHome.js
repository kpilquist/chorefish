import React, {Component} from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Image
            source={require('../img/ChoreFish.jpg')}
            style={styles.mainImg}
          />
        </View>

        <View style={styles.tbutton}>
          <TouchableOpacity
            title="Login"
            style={styles.touchableButton}
            onPress={() => this.props.navigation.push('Login')}>
            <Text style={styles.touchableText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bButton}>
          <TouchableOpacity
            title="Sign Up"
            style={styles.touchableButton}
            onPress={() => this.props.navigation.push('Signup')}>
            <Text style={styles.touchableText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '.13rem',
    borderColor: '#8B82FE',
  },
  item: {
    justifyContent: 'center',
  },
  tbutton: {
    width: '18rem',
  },
  bButton: {
    paddingTop: '1.3rem',
    width: '18rem',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  mainImg: {
    width: '21rem',
    height: '21rem',
  },

  touchableButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#292050',
    alignItems: 'center',
    backgroundColor: '#8B82FE',
    padding: '.6rem',
  },

  touchableText: {
    fontSize: '1rem',
    color: '#fff',
  },
});
