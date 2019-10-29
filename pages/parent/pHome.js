import React, {Component} from 'react';
import axios from 'axios';
import '../global';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

export class parentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: '-=-=-=-=-:',
        };
    }

    componentDidMount() {
        this.getData().then();
    }

    getData = async () => {
        axios
            .get(global.url + '/api/auth/family', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: 'Bearer ' + global.bearer,
                },
            })
            .then(response => {
                this.setState({titleText: JSON.stringify(response.data.success)});
            })
            .catch(error => {
                console.log(error.data);
                this.setState({titleText: JSON.stringify(error.data)});
            });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Parent Home</Text>
                <View style={styles.view}/>
                <Text>Test: {this.state.titleText}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
    },
    view: {
        alignItems: 'center',
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
    touchableButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#292050',
        alignItems: 'center',
        backgroundColor: '#8B82FE',
        paddingTop: 10,
        paddingBottom: 10,
        width: '75%',
    },

    touchableText: {
        fontSize: 20,
        color: '#fff',
    },
});
