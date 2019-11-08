import React, {Component} from 'react';
import axios from 'axios';
import {ScrollView, StyleSheet, Text} from 'react-native';
import '../global';

export class accountScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: '=-=-=-=-=-=:>',
    };
  }

  componentDidMount() {
    this.getData().then();
  }

  getData = async () => {
    axios
      .get(global.url + '/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + global.bearer,
        },
      })
      .then(response => {
        this.setState({titleText: JSON.stringify(response.data)});
      })
      .catch(error => {
        console.log(error);
        this.setState({titleText: JSON.stringify(error)});
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text> Server Info: {this.state.titleText}</Text>
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
