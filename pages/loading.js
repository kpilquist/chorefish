import React, {Component} from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import './global';

export class loadingScreen extends Component {

  componentDidMount() {
    this._bootstrapAsync().then(this.login);
  }

  _bootstrapAsync = async () => {
    global.bearer = await AsyncStorage.getItem('@BearerT');
  };



  login = async () => {
    axios
      .get(global.url + '/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + global.bearer,
        },
      })
      .then(response => {
        response.data.ischild
          ? this.props.navigation.navigate('cHome')
          : this.props.navigation.navigate('ParentHome');
        //todo: add logic for email not verified and subscription status
      })
      .catch(error => {
        console.log(error);
        this.props.navigation.navigate('Home');
      });
  };

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
