import React, {Component} from 'react';
import axios from 'axios';
import './global';
import {Linking, ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passError: false,
      errorText: '',
    };
  }

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  handelError = data => {
    if (data.hasOwnProperty('password')) {
      console.log(data.password);
      this.setState({passError: true});
    } else {
      this.setState({passError: false});
    }
    if (data.hasOwnProperty('email')) {
      console.log(data.username);
      this.setState({emailError: true});
    } else {
      this.setState({emailError: false});
    }

    if (this.state.passError || this.state.emailError) {
      this.setState({errorText: 'Login Error: Fields can not be blank.'});
    }

    if (data.hasOwnProperty('message')) {
      this.setState({
        errorText: 'Login failed; check Email or Username and Password',
        emailError: true,
        passError: true,
      });
    }
  };

  login = (email, password) => {
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
          this.props.navigation.navigate('AuthLoading');
        }
      })
      .catch(error => {
        this.handelError(error.response.data);
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
          <Text style={styles.error}>{this.state.errorText}</Text>
        <TextInput
            style={[
              styles.input,
              {borderColor: this.state.emailError ? '#ff0023' : '#7a42f4'},
            ]}
            underlineColorAndroid={'transparent'}
            placeholder={'Email or User Name'}
            placeholderTextColor={'#9a73ef'}
            autoCapitalize={'none'}
            onChangeText={this.handleEmail}
        />

        <TextInput
            style={[
              styles.input,
              {borderColor: this.state.passError ? '#ff0023' : '#7a42f4'},
            ]}
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            placeholder={'Password'}
            placeholderTextColor={'#9a73ef'}
            autoCapitalize={'none'}
            onChangeText={this.handlePassword}
        />
          <View style={[styles.container, styles.reset]}/>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>

          <TouchableOpacity
              style={styles.submitButton}
              title="Reset Password"
              onPress={() => {
                Linking.openURL('https://chorefish.com/password/reset');
              }}>
            <Text style={styles.submitButtonText}> Reset Password </Text>
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
  error: {
    color: '#ff0023',
    fontSize: 10,
  },
  reset: {},
});
