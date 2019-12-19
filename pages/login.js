import React, {Component} from 'react';
import axios from 'axios';
import './global';
import {ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      email: '',
      password: '',
    };
  }

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  login = (email, password) => {
    console.log('Login');
    axios
      .post(
        global.url + '/api/auth/login',
        {email, password},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
      .then(response => {
        if (response.data.hasOwnProperty('access_token')) {
          this.saveToken(response.data.access_token).then(
            (global.bearer = response.data.access_token),
          );
          console.log('Token Recived');
          this.props.navigation.navigate('AuthLoading');
        }
      })
      .catch(error => {
        console.log('Token NOT Received');
        console.log(JSON.stringify(error));
        this.props.navigation.navigate('Login');
      });
  };

  saveToken = async token => {
    try {
      await AsyncStorage.setItem('@BearerT', token);
    } catch (e) {
      console.log(e);
    }
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
    return (
        <ScrollView>
          <View styles={styles.container}>
            <Text>Login</Text>
          </View>
        <TextInput
            style={styles.input}
            underlineColorAndroid={'transparent'}
            placeholder={'Email or User Name'}
            placeholderTextColor={'#9a73ef'}
            autoCapitalize={'none'}
            onChangeText={this.handleEmail}
        />

        <TextInput
            style={styles.input}
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            placeholder={'Password'}
            placeholderTextColor={'#9a73ef'}
            autoCapitalize={'none'}
            onChangeText={this.handlePassword}
        />
        <View style={styles.container} />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>

        <Text>{this.state.titleText}</Text>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: '1.5rem',
    height: '2.2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.5rem',
    height: '2.2rem',
  },
  submitButtonText: {
    color: 'white',
  },
});
