import React, {Component} from 'react';
import '../global';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {ChildHeader} from '../tools/header';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class settingsView extends Component {
  gotoMkG = () => {
    this.props.navigation.navigate('mkGaurd');
  };
  gotoMchld = () => {
    this.props.navigation.navigate('mkChild');
  };

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
        <View style={styles.outer}>
          <View style={styles.header1}>
            <ChildHeader text={'Chore Fish'}/>
          </View>
          <View style={styles.lineStyle}/>
          <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.submitButton} onPress={this.gotoMkG}>
              <Text style={styles.submitButtonText}> New Guardian </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={this.gotoMchld}>
              <Text style={styles.submitButtonText}> New Child </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={this.logout}>
              <Text style={styles.submitButtonText}> Log Out </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    );
  }
}

const styles = EStyleSheet.create({
  outer: {
    flexDirection: 'column',
    backgroundColor: '#e3e1e2',
  },
  header1: {
    paddingTop: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    paddingTop: '1.75rem',
  },
  input: {
    margin: '1.4rem',
    height: '2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    margin: '.5rem',
    height: '2.2rem',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#000285',
  },
});
