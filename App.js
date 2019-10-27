import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen} from './pages/login';
import {signUpScreen} from './pages/signup';

class HomeScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <View style={{justifyContent: 'center',}}>
                    <Image source={require('./img/ChoreFish.jpg')} style={styles.mainImg}/>
                </View>

                <View style={{paddingTop: 25, width: '80%',}}>
                    <TouchableOpacity title='Login' style={styles.touchableButton}
                                      onPress={() => this.props.navigation.push('Login')}>
                        <Text style={styles.touchableText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingTop: 25, width: '80%'}}>
                    <TouchableOpacity title='Sign Up' style={styles.touchableButton}
                                      onPress={() => this.props.navigation.push('Signup')}>
                        <Text style={styles.touchableText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }


}


const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Login: LoginScreen,
        Signup: signUpScreen,

    },
    {
        initialRouteName: 'Home',
    },
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderColor: '#8B82FE',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    activeTitle: {
        color: 'red',
    },
    mainImg: {
        width: 400,
        height: 400
    },


    touchableButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#292050',
        alignItems: 'center',
        backgroundColor: '#8B82FE',
        padding: 10

    },

    touchableText: {
        fontFamily: 'AdventPro-Medium',
        fontSize: 20,
        color: '#fff',
    },

});


export default createAppContainer(AppNavigator);
