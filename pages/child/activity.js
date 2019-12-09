import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class activityView extends Component {
    render() {
        return (

            <View style={styles.container}>
                <Text> Example </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
    },
    iconContainer: {
        width: 50,
        height: 50,
    },
    star: {
        width: '100%',
        height: 100,
    },
});
