import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import axios from 'axios';
import '../global';

export class mkChldScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      First_Name: '',
      Last_Name: '',
      email: '',
      password: '',
      username: '',
      titleText: '',
      disabled: true,
        pwordError: false,
        unameError: false,
        fnameError: false,
        fnameErrorText: '',
        unameErrorText: '',
        pwordErrorText: '',
    };
  }

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };
  handelFirstName = text => {
    this.setState({First_Name: text});
  };

  handelSecondName = text => {
    this.setState({Last_Name: text});
  };

  handleuserName = text => {
    this.setState({username: text});
  };

  enable = () => {
    this.setState({disabled: true});
  };

    handelError = data => {
        if (data.hasOwnProperty('password')) {
            console.log(data.password);
            this.setState({pwordError: true, pwordErrorText: data.password});
        } else {
            this.setState({pwordError: false, pwordErrorText: ''});
        }
        if (data.hasOwnProperty('username')) {
            console.log(data.username);
            this.setState({unameError: true, unameErrorText: data.username});
        } else {
            this.setState({unameError: false, unameErrorText: ''});
        }
        if (data.hasOwnProperty('First_Name')) {
            console.log(data.username);
            this.setState({fnameError: true, fnameErrorText: data.First_Name});
        } else {
            this.setState({fnameError: false, fnameErrorText: ''});
        }
    };

  handelSubmit = () => {
    this.setState({disabled: false});

      const {First_Name, password, username} = this.state;

    axios
      .post(
        global.url + '/api/auth/mkchld',
        {
          First_Name: First_Name,
          password: password,
          username: username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Bearer ' + global.bearer,
          },
        },
      )
      .then(response => {
          this.enable();
          this.props.navigation.navigate('ParentHome');
      })
      .catch(error => {
          this.handelError(error.response.data);
        this.enable();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>First Name</Text>
          <Text style={styles.error}>{this.state.fnameErrorText}</Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
              {borderColor: this.state.fnameError ? '#ff0023' : '#7a42f4'},
          ]}
          underlineColorAndroid="transparent"
          placeholder="First Name"
          placeholderTextColor="#C0C0C0"
          autoCapitalize="none"
          onChangeText={this.handelFirstName}
          editable={this.state.disabled}
        />
        <Text style={styles.labelText}>User Name</Text>
        <Text style={styles.detail}>No Spaces Allowed</Text>
          <Text style={styles.error}>{this.state.unameErrorText}</Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
              {borderColor: this.state.unameError ? '#ff0023' : '#7a42f4'},
          ]}
          underlineColorAndroid="transparent"
          placeholder="User Name"
          placeholderTextColor="#C0C0C0"
          autoCapitalize="none"
          onChangeText={this.handleuserName}
          editable={this.state.disabled}
        />
        <Text style={styles.labelText}>Password</Text>
        <Text style={styles.detail}>Minimum of 8 characters</Text>
          <Text style={styles.error}>{this.state.pwordErrorText}</Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
              {borderColor: this.state.pwordError ? '#ff0023' : '#7a42f4'},
          ]}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#C0C0C0"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
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
    backgroundColor: '#e3e1e2',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    borderRadius: 10,
    margin: 15,
    marginTop: 1,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '75%',
  },
  submitButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#292050',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    height: 40,
    width: '75%',
  },
  submitButtonText: {
    color: '#ff8151',
  },
  labelText: {
    paddingTop: 10,
  },
  detail: {
    fontSize: 8,
  },
    error: {
        color: '#ff0023',
        fontSize: 10,
    },
});
