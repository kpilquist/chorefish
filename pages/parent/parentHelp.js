import React from 'react';
import {View,} from 'react-native';
import '../global';
import EStyleSheet from 'react-native-extended-stylesheet';

export class demeritScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={styles.outer}>

            </View>
        );
    }
}

const Options = [
    {label: 'Screen Time', value: true},
    {label: 'Allowance', value: false},
];

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e3e1e2',
    },
    lineStyle: {
        borderWidth: 1,
        borderColor: '#000285',
    },
    submitButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#292050',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1.4rem',
        height: '2.5rem',
        width: '16rem',
    },
    submitButtonText: {
        color: '#fff',
    },
    labelText: {
        paddingTop: '.5rem',
    },

    timeContainer: {
        flexDirection: 'row',
    },
    labelContainer: {
        alignItems: 'center',
    },
    timeInput: {
        borderRadius: 5,
        margin: '1.75rem',
        marginTop: '.1rem',
        height: '2rem',
        borderColor: '#7a42f4',
        borderWidth: 1,
        width: '4.7rem',
    },
    moneyInput: {
        borderRadius: 5,
        marginHorizontal: '1.4rem',
        marginBottom: '1.4rem',
        height: '2rem',
        borderColor: '#7a42f4',
        borderWidth: 1,
        width: '14rem',
    },
    sw1: {
        margin: '1.4rem',
        marginTop: '.14rem',
        width: '16rem',
    },
    inputBox: {
        borderRadius: 5,
        marginHorizontal: '1.4rem',
        height: '4rem',
        borderColor: '#7a42f4',
        borderWidth: 1,
        width: '16rem',
    },
    outer: {
        flex: 1,
        backgroundColor: '#e3e1e2',
    },
    header1: {
        paddingTop: '1.4rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    error: {
        color: '#ff0023',
        fontSize: 10,
    },
});
