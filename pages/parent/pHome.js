import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export class parentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '-=-=-=-=-:',
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Parent Home</Text>
        <View style={styles.tbutton}>
          <TouchableOpacity
            title="Account"
            style={styles.submitButton}
            onPress={() => this.props.navigation.push('Other')}>
            <Text style={styles.submitButtonText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="loading"
            style={styles.submitButton}
            onPress={() => this.props.navigation.navigate('AuthLoading')}>
            <Text style={styles.submitButtonText}>Loading</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="logout"
            style={styles.submitButton}
            onPress={() => this.props.navigation.navigate('Logout')}>
            <Text style={styles.submitButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text>Test: {this.state.titleText}</Text>
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
