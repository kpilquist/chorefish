import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import axios from 'axios';
import '../global';

export class mkGaurdScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      disabled: true,
        pwordError: false,
        emailError: false,
        nameError: false,
        pwordErrorText: '',
        emailErrorText: '',
        nameErrorText: '',
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
    };

  handelSubmit = () => {
    this.setState({disabled: false});
    const {name, password, email} = this.state;

    axios
      .post(
        global.url + '/api/auth/mkgaurd',
        {
          name: name,
          password: password,
          email: email,
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
        <Text style={styles.labelText}>Display Name</Text>
          <Text style={styles.error}>{this.state.nameErrorText}</Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
              {borderColor: this.state.nameError ? '#ff0023' : '#7a42f4'},
          ]}
          underlineColorAndroid="transparent"
          placeholder="Display Name"
          placeholderTextColor="#C0C0C0"
          autoCapitalize="none"
          onChangeText={this.handelName}
          editable={this.state.disabled}
        />
          <Text style={styles.labelText}>Guardian's Email</Text>
          <Text style={styles.error}>{this.state.emailErrorText}</Text>
        <TextInput
            style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                {borderColor: this.state.emailError ? '#ff0023' : '#7a42f4'},
          ]}
            underlineColorAndroid="transparent"
            placeholder="New Guardian Email"
            placeholderTextColor="#C0C0C0"
            autoCapitalize="none"
            onChangeText={this.handleEmail}
            editable={this.state.disabled}
        />
          <Text style={styles.labelText}>Guardian's Password</Text>
        <Text style={styles.detail}>Minimum of 8 characters</Text>
          <Text style={styles.error}>{this.state.pwordErrorText}</Text>
        <TextInput
            style={[
            styles.input,
            {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                {borderColor: this.state.pwordError ? '#ff0023' : '#7a42f4'},
          ]}
            underlineColorAndroid="transparent"
            placeholder="Password for new Guardian"
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
