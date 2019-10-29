import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {LoginScreen} from './pages/login';
import {signUpScreen} from './pages/signup';
import {childHome} from './pages/child/cHome';
import {parentHome} from './pages/parent/pHome';
import {loadingScreen} from './pages/loading';
import {HomeScreen} from './pages/appHome';
import {loader} from './pages/load';
import logout from './pages/logout';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {accountScreen} from './pages/parent/account';
import {mkChldScreen} from './pages/parent/mkChld';
import React from 'react';

const childStack = createStackNavigator({
    cHome: childHome,
});

const AuthStack = createStackNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Signup: signUpScreen,
    Logout: logout,
});

const parentNav = createMaterialBottomTabNavigator(
    {
        ParentHome: {
            screen: parentHome,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>
                    </View>
                ),
            },
        },
        Profile: {
            screen: accountScreen,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>
                    </View>
                ),
            },
        },
        NewChild: {
            screen: mkChldScreen,
            navigationOptions: {
                tabBarLabel: 'New Child',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-child'}/>
                    </View>
                ),
            },
        },
        Reload: {
            screen: loadingScreen,
            navigationOptions: {
                tabBarLabel: 'Restart',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-refresh'}/>
                    </View>
                ),
            },
    },
        Logout: {
            screen: logout,
            navigationOptions: {
                tabBarLabel: 'Log Out',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon
                            style={[{color: tintColor}]}
                            size={25}
                            name={'ios-settings'}
                        />
                    </View>
                ),
            },
    },
    },
    {
        initialRouteName: 'ParentHome',
        activeColor: '#f0edf6',
        inactiveColor: '#ff8151',
        barStyle: {backgroundColor: '#7a42f4'},
    },
);

export default createAppContainer(
    createSwitchNavigator(
        {
            loading: loader,
            AuthLoading: loadingScreen,
            Child: childStack,
            Parent: parentNav,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        },
    ),
);
