import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import EStyleSheet from 'react-native-extended-stylesheet';

export class signUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      titleText: '',
        disabled: false,
        pwordError: false,
        emailError: false,
        nameError: false,
        nameErrorText: '',
        emailErrorText: '',
        pwordErrorText: '',
        pwordConfErrorText: '',
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
      this.setState({disabled: false});
  };

  handlePword = () => {
    this.setState({pwordError: false});
  };

    handelError = data => {
        if (data.hasOwnProperty('password')) {
            console.log(data.password);
            this.setState({pwordError: true, pwordErrorText: data.password});
        } else {
            this.setState({pwordError: false, pwordErrorText: ''});
        }
        if (data.hasOwnProperty('email')) {
            console.log(data.username);
            this.setState({emailError: true, emailErrorText: data.email});
        } else {
            this.setState({emailError: false, emailErrorText: ''});
        }
        if (data.hasOwnProperty('name')) {
            console.log(data.username);
            this.setState({nameError: true, nameErrorText: data.name});
        } else {
            this.setState({nameError: false, nameErrorText: ''});
        }
        if (data.hasOwnProperty('password_confirmation')) {
            console.log(data.username);
            this.setState({
                pwordError: true,
                pwordConfErrorText: data.password_confirmation,
            });
        } else {
            this.setState({pwordConfErrorText: ''});
        }
    };

  handelSubmit() {
      this.setState({disabled: true});

    const {name, email, password, password_confirmation} = this.state;

      axios
          .post(
              global.url + '/api/auth/signup',
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
              this.handelError(error.response.data);
              this.enable();
          });
  }

  render() {
    return (
        <View style={styles.container}>
        <Text>Sign Up</Text>

            <Text style={styles.decText}>
                Display Name (Example: Mom, Dad, Uncle Bob)
            </Text>
            {this.state.nameError && (
                <Text style={styles.error}>{this.state.nameErrorText}</Text>
            )}
        <TextInput
            style={[
            styles.input,
                {backgroundColor: this.state.disabled ? '#C0C0C0' : '#fff'},
                {borderColor: this.state.nameError ? '#dc0019' : '#7a42f4'},
          ]}
            underlineColorAndroid="transparent"
            placeholder="Name"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handelName}
            editable={!this.state.disabled}
        />
            <Text style={styles.decText}>Email Address:</Text>
            {this.state.emailError && (
                <Text style={styles.error}>{this.state.emailErrorText}</Text>
            )}
        <TextInput
            style={[
            styles.input,
                {backgroundColor: this.state.disabled ? '#C0C0C0' : '#fff'},
                {borderColor: this.state.emailError ? '#dc0019' : '#7a42f4'},
          ]}
            underlineColorAndroid="transparent"
            placeholder="E-mail"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleEmail}
            editable={!this.state.disabled}
        />
            <Text style={styles.decText}>Password (Minimum of 8 characters):</Text>
            {this.state.pwordError && (
                <Text style={styles.error}>{this.state.pwordErrorText}</Text>
            )}
        <TextInput
            style={[
            styles.input,
                {backgroundColor: this.state.disabled ? '#C0C0C0' : '#fff'},
                {borderColor: this.state.pwordError ? '#dc0019' : '#7a42f4'},
          ]}
            underlineColorAndroid={'transparent'}
            placeholder={'Password'}
            placeholderTextColor={'#9a73ef'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={this.handlePassword}
            editable={!this.state.disabled}
        />
            <Text style={styles.decText}>Confirm Password:</Text>
        <TextInput
            style={[
            styles.input,
                {backgroundColor: this.state.disabled ? '#C0C0C0' : '#fff'},
                {borderColor: this.state.pwordError ? '#dc0019' : '#7a42f4'},
          ]}
            underlineColorAndroid={'transparent'}
            placeholder={'Re-enter Password'}
            placeholderTextColor={'#9a73ef'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={this.handleConf}
            editable={!this.state.disabled}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
              {backgroundColor: this.state.disabled ? '#fff' : '#7a42f4'},
          ]}
          onPress={() => this.handelSubmit()}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },
  input: {
      margin: '.2rem',
      height: '2.2rem',
      borderRadius: 4,
    borderColor: '#7a42f4',
    borderWidth: 1,
      width: '16rem',
  },
  submitButton: {
      height: '2.2rem',
      width: '16rem',
      marginTop: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
    decText: {
        marginTop: '1rem',
        fontSize: 10,
    },
    error: {
        color: '#ff0023',
        fontSize: 10,
    },
});
