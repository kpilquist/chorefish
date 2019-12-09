import React, {Component} from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet,Text} from 'react-native';


export class Icon extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{(this.props.name === null)?'#':this.props.name.substring(0,2)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#292050',
        backgroundColor: '#fffbfb',
        width:50,
        borderWidth:2,
        borderRadius: 5,
    },
    text:{
        alignSelf: 'center',
        //color:'#ff6900',
        color:'#000000',
        fontSize:30,
    },
});
