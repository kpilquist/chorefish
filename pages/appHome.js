import React, {Component} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderColor: '#8B82FE',
  },
  item: {
    justifyContent: 'center',
  },
  tbutton: {
    width: '80%',
  },
  bButton: {
    paddingTop: 25,
    width: '80%',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  mainImg: {
    width: 350,
    height: 350,
  },

  touchableButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#292050',
    alignItems: 'center',
    backgroundColor: '#8B82FE',
    padding: 10,
  },

  touchableText: {
    fontSize: 20,
    color: '#fff',
  },
});
