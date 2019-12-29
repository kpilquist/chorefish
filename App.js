import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';

import React from 'react';
import {LoginScreen} from './pages/login';
import {signUpScreen} from './pages/signup';
import {childHome} from './pages/child/cHome';
import {parentHome} from './pages/parent/pHome';
import {loadingScreen} from './pages/loading';
import {HomeScreen} from './pages/appHome';
import {loader} from './pages/load';
import logout from './pages/logout';
import {Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {accountScreen} from './pages/parent/account';
import {mkChldScreen} from './pages/parent/mkChld';
import {mkChoreScreen} from './pages/parent/mkChore';
import {mkGaurdScreen} from './pages/parent/mkGaurdian';
import {demeritScreen} from './pages/parent/dmrt';
import {newChoreView} from './pages/child/newChore';
import {piggyBankView} from './pages/child/piggyBank';
import chldAct from './pages/parent/chldAct';
import settingsView from './pages/parent/settings';
import newActivityView from './pages/child/childActivity';
import EStyleSheet from 'react-native-extended-stylesheet';

let {height, width} = Dimensions.get('window');
EStyleSheet.build({
    $rem: width > 340 ? 18 : 16,
});

const AuthStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Signup: signUpScreen,
  Logout: logout,
});

const childStack = createMaterialBottomTabNavigator(
  {
    childHome: {
      screen: childHome,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-home'} />
          </View>
        ),
      },
    },
    newChore: {
      screen: newChoreView,
      navigationOptions: {
        tabBarLabel: 'Chore',
        tabBarIcon: ({tintColor}) => (
          <View>
            <IconMaterialCommunityIcons
              style={[{color: tintColor}]}
              size={25}
              name={'broom'}
            />
          </View>
        ),
      },
    },
    newActivity: {
        screen: newActivityView,
      navigationOptions: {
          tabBarLabel: 'Activity',
        tabBarIcon: ({tintColor}) => (
          <View>
            <IconMaterialCommunityIcons
              style={[{color: tintColor}]}
              size={25}
              name={'bike'}
            />
          </View>
        ),
      },
    },
    Logout: {
      screen: logout,
      navigationOptions: {
        tabBarLabel: 'Logout',
        tabBarIcon: ({tintColor}) => (
          <View>
            <IconFontAwesome5
              style={[{color: tintColor}]}
              size={20}
              name={'gamepad'}
            />
          </View>
        ),
      },
    },
    piggyBank: {
      screen: piggyBankView,
      navigationOptions: {
        tabBarLabel: 'Bank',
        tabBarIcon: ({tintColor}) => (
          <View>
            <IconFontAwesome5
              style={[{color: tintColor}]}
              size={22}
              name={'piggy-bank'}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'childHome',
    activeColor: '#f0edf6',
    inactiveColor: '#ff8151',
    barStyle: {backgroundColor: '#331c57'},
  },
);

const parentNav = createMaterialBottomTabNavigator(
  {
    ParentHome: {
      screen: parentHome,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-home'} />
          </View>
        ),
      },
    },
    New: {
      screen: mkChoreScreen,
      navigationOptions: {
        tabBarLabel: 'New Chore',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-compass'} />
          </View>
        ),
      },
    },
    Profile: {
      screen: demeritScreen,
      navigationOptions: {
        tabBarLabel: 'Penalty',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-nuclear'} />
          </View>
        ),
      },
    },
      Settings: {
          screen: settingsView,
          key: 'settings',
      navigationOptions: {
          tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-settings'} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'ParentHome',
    activeColor: '#f0edf6',
    inactiveColor: '#ff8151',
    barStyle: {backgroundColor: '#331c57'},
  },
);

const SettingsStack = createStackNavigator({
    mkChild: {
        screen: mkChldScreen,
        navigationOptions: ({navigation}) => ({
            //don't forget parentheses around the object notation
            title: 'New Child',
            headerMode: 'none',
            headerLeft: (
                <HeaderBackButton
                    onPress={() => {
                        navigation.navigate('Settings');
                    }}
                />
            ),
        }),
    },
    mkGaurd: {
        screen: mkGaurdScreen,
        navigationOptions: ({navigation}) => ({
            //don't forget parentheses around the object notation
            title: 'New Gaurdian',
            headerMode: 'none',
            headerLeft: (
                <HeaderBackButton
                    onPress={() => {
                        navigation.navigate('Settings');
                    }}
                />
            ),
        }),
    },
    Account: {
        screen: accountScreen,
    },
    parentChild: {
        screen: chldAct,
        navigationOptions: ({navigation}) => ({
            //don't forget parentheses around the object notation
            title: 'Child Details',
            headerMode: 'none',
            headerLeft: (
                <HeaderBackButton
                    onPress={() => {
                        navigation.navigate('ParentHome');
                    }}
                />
            ),
        }),
    },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      loading: loader,
      AuthLoading: loadingScreen,
      Child: childStack,
      Parent: parentNav,
      Auth: AuthStack,
        ParentSettings: SettingsStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
