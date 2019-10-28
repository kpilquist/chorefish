import React, {Component} from 'react';
import axios from 'axios';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class childHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: 'Result:',
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
    axios
      .post(
        'http://192.168.1.8:8000/api/auth/login',
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
            console.log('Token Recived'),
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  /*
          getMyValue = async () => {
              try {
                  const value = await AsyncStorage.getItem('@BearerT');
                  console.log('Get: '+ value);
              } catch(e) {
                  console.log('Get Error: '+e)
              }
              console.log('Complete')
          };
      */

  saveToken = async token => {
    try {
      await AsyncStorage.setItem('@BearerT', token);
    } catch (e) {
      console.log(e);
    }
    console.log('Info was Saved');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.container}>Child Home</Text>
        <Text>{this.state.titleText}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});
