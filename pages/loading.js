import React, {Component} from 'react';
import {Keyboard, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    validate() {
        //include your validation inside if condition
        if (this.state.password == "yourname") {
            ToastAndroid.show("Success", ToastAndroid.SHORT)
            // navigate to next screen
        } else {
            Keyboard.dismiss();
            ToastAndroid.show("Wrong password, try again", ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', flex: 1}}>
                <TextInput
                    style={{width: '90%', backgroundColor: 'white'}}
                    returnKeyType="go"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity onPress={() => this.validate()}
                                  style={{padding: 15, backgroundColor: 'rgb(102, 192, 231)'}}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
