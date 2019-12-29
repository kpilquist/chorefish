import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import '../global';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class parentChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fname: '',
            screen: '',
            hr: null,
            min: null,
            money: null,
            chores: '',
            allowance: null,
            disabled: false,
        };
        this.get('get');
    }

    submitButton = () => {

        this.get('put');
    }
    delButton = () => {
        this.get('delete');
    }

    get = async (mode) => {
        axios
            .post(
                global.url + '/api/auth/childDetail',
                {
                    uuid: this.props.navigation.getParam('uuid'),
                    mode: mode,
                    fname: this.state.fname,
                    hr: this.state.hr,
                    min: this.state.min,
                    money: this.state.allowance,
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
                console.log('chldAct 40: ' + JSON.stringify(response.data));

                if (response.data.hasOwnProperty('child')) {
                    this.setState({
                        name: response.data.child[0].fname,
                        screen: response.data.child[0].screen,
                        money: response.data.child[0].allowance,
                        chores: response.data.count,
                    });
                }
                if (response.data.hasOwnProperty('deleted')) {
                    this.props.navigation.navigate('ParentHome');
                }

                console.log(this.state);
            })
            .catch(error => {
                console.log(error.response.data.message);
            });
    };

    handelError = data => {
        if (data.hasOwnProperty('childrenString')) {
            this.setState({
                csErr: true,
                csTxt: 'At least one child must be selected',
            });
        } else {
            this.setState({csErr: false, csTxt: ''});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Child Name: {this.state.name}</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                        placeholder={'First Name'}
                        placeholderTextColor={'#C0C0C0'}
                        autoCapitalize={'none'}
                        keyboardType="default"
                        onChangeText={value => this.setState({fname: value})}
                    />
                    <Text>Screen Time {this.state.screen}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={[styles.textInput, styles.hour, {marginRight: 15}]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Hours'}
                            placeholderTextColor={'#C0C0C0'}
                            autoCapitalize={'none'}
                            keyboardType="numeric"
                            onChangeText={value => this.setState({hr: value})}
                        />
                        <TextInput
                            style={[styles.textInput, styles.min]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Minutes'}
                            placeholderTextColor={'#C0C0C0'}
                            autoCapitalize={'none'}
                            keyboardType="numeric"
                            onChangeText={value => this.setState({min: value})}
                        />
                    </View>
                    <Text>Allowance {this.state.money}</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Money'}
                        placeholderTextColor={'#C0C0C0'}
                        autoCapitalize={'none'}
                        keyboardType="numeric"
                        onChangeText={value => this.setState({allowance: value})}
                    />
                    <Text>Total Chores: {this.state.chores}</Text>
                    <TouchableOpacity style={styles.submitButton} onPress={this.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={this.delButton}>
                        <Text style={styles.submitButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: '#e3e1e2',
        flex: 1,
        alignItems: 'center',
        paddingTop: '2rem',
    },
    textInput: {
        borderRadius: 4,
        borderBottomWidth: 1,
        height: '2.2rem',
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        margin: '.5rem',
        height: '2.2rem',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: 'white',
    }, hour: {
        width: '4rem'
    },
    min: {
        width: '4rem'
    },
});
