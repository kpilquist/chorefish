import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import axios from 'axios';

export class signUpScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            titleText: 'Response'

        };
    }


    handleEmail = (text) => {
        this.setState({email: text})
    };

    handlePassword = (text) => {
        this.setState({password: text})
    };
    handelName = (text) => {
        this.setState({name: text})
    };

    handleConf = (text) => {
        this.setState({password_confirmation: text})
    };


    handelSubmit() {

        const {name, email, password, password_confirmation} = this.state;

        if (password !== password_confirmation) {
            alert("Passwords don't match");
        } else {

            axios.post('http://192.168.1.8:8000/api/auth/signup', {
                    email: email,
                    password: password,
                    name: name,
                    password_confirmation: password_confirmation
                },
                {headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}})
                .then(response => {
                    this.setState({titleText: JSON.stringify(response.data)});
                })
                .catch(error => {
                    this.setState({titleText: JSON.stringify(error)});
                    console.log(error);
                });


            //this.setState({titleText:JSON.stringify(this.state)}); TODO Error Handleing
        }
    }


    render() {

        return (

            <View style={{flex: 1}}>
                <Text>Sign Up</Text>
                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="Name"
                           placeholderTextColor="#9a73ef"
                           autoCapitalize="none"
                           onChangeText={this.handelName}/>

                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="E-mail"
                           placeholderTextColor="#9a73ef"
                           autoCapitalize="none"
                           onChangeText={this.handleEmail}/>

                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="Password"
                           placeholderTextColor="#9a73ef"
                           autoCapitalize="none"
                           onChangeText={this.handlePassword}/>

                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="Re-enter Password"
                           placeholderTextColor="#9a73ef"
                           autoCapitalize="none"
                           onChangeText={this.handleConf}/>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.handelSubmit()
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                <Text>
                    {this.state.titleText}
                </Text>

            </View>

        )

    }


}


const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {

        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {

        color: 'white'
    }
});
