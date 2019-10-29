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

    handelSubmit = () => {
        this.setState({disabled: false});

        const {First_Name, Last_Name, password, email, username} = this.state;

        axios
            .post(
                'http://192.168.1.8:8000/api/auth/mkchld',
                {
                    First_Name: First_Name,
                    Last_Name: Last_Name,
                    password: password,
                    email: email,
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
                console.log(response.data);
                this.setState({titleText: JSON.stringify(response.data.success)});
            })
            .catch(error => {
                console.log(error.data.error);
                this.setState({titleText: JSON.stringify(error.data.error)});
                this.enable();
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Add Child</Text>

                <Text style={styles.labelText}>First Name</Text>
                <TextInput
                    style={[
                        styles.input,
                        {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                    ]}
                    underlineColorAndroid="transparent"
                    placeholder="First Name"
                    placeholderTextColor="#C0C0C0"
                    autoCapitalize="none"
                    onChangeText={this.handelFirstName}
                    editable={this.state.disabled}
                />
                <Text style={styles.labelText}>Last Name</Text>
                <TextInput
                    style={[
                        styles.input,
                        {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                    ]}
                    underlineColorAndroid="transparent"
                    placeholder="Last Name"
                    placeholderTextColor="#C0C0C0"
                    autoCapitalize="none"
                    onChangeText={this.handelSecondName}
                    editable={this.state.disabled}
                />
                <Text style={styles.labelText}>User Name</Text>
                <Text style={styles.detail}>No Spaces Allowed</Text>
                <TextInput
                    style={[
                        styles.input,
                        {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
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
                <TextInput
                    style={[
                        styles.input,
                        {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
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
});
