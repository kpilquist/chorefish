import React, {Component} from 'react';
import axios from 'axios';
import './global';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class logout extends Component {
  logout = async () => {
    axios
      .get(global.url + '/api/auth/logout', {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + global.bearer,
        },
      })
      .then(response => {
        console.log('User Details: ' + JSON.stringify(response));
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(error => {
        console.log(error);
        this.props.navigation.navigate('AuthLoading');
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.container}>Log Out</Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.logout()}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
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
