import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

export class signUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      titleText: '',
      disabled: true,
      pwordError: true,
      emailError: true,
    };
  }

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };
  handelName = text => {
    this.setState({name: text});
  };

  handleConf = text => {
    this.setState({password_confirmation: text});
  };

  enable = () => {
    this.setState({disabled: true});

  };


  handlePword = () => {
    this.setState({pwordError: false});
  };

  handelSubmit() {
    this.setState({disabled: false});

    const {name, email, password, password_confirmation} = this.state;

    if (password !== password_confirmation) {
      this.handlePword();
      this.enable();
    } else {
      axios
        .post(
          'http://192.168.1.8:8000/api/auth/signup',
          {
            email: email,
            password: password,
            name: name,
            password_confirmation: password_confirmation,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          },
        )
        .then(response => {
          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error);
          this.enable();
        });
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Sign Up</Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
          ]}
          underlineColorAndroid="transparent"
          placeholder="Name"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handelName}
          editable={this.state.disabled}
        />

        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
            {borderColor: this.state.emailError ? '#7a42f4' : '#dc0019'},
            {borderWidth: this.state.emailError ? 1 : 2},
          ]}
          underlineColorAndroid="transparent"
          placeholder="E-mail"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
          editable={this.state.disabled}
        />

        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
            {borderColor: this.state.pwordError ? '#7a42f4' : '#dc0019'},
            {borderWidth: this.state.pwordError ? 1 : 2},
          ]}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
          editable={this.state.disabled}
        />

        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
            {borderColor: this.state.pwordError ? '#7a42f4' : '#dc0019'},
            {borderWidth: this.state.pwordError ? 1 : 2},
          ]}
          underlineColorAndroid="transparent"
          placeholder="Re-enter Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleConf}
          editable={this.state.disabled}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            {backgroundColor: this.state.disabled ? '#7a42f4' : '#C0C0C0'},
          ]}
          onPress={() => this.handelSubmit()}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <Text>{this.state.titleText}</Text>
      </View>
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
    width: '75%',
  },
  submitButton: {
    padding: 10,
    margin: 15,
    height: 40,
    width: '75%',
  },
  submitButtonText: {
    color: 'white',
  },
});
