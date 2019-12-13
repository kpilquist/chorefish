import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
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
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {accountScreen} from './pages/parent/account';
import {mkChldScreen} from './pages/parent/mkChld';
import {mkChoreScreen} from './pages/parent/mkChore';
import {mkGaurdScreen} from './pages/parent/mkGaurdian';
import {demeritScreen} from './pages/parent/dmrt';
import {Star} from './pages/tools/stars';
import {newChoreView} from './pages/child/newChore';
import {piggyBankView} from './pages/child/piggyBank';

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
      screen: logout,
      navigationOptions: {
        tabBarLabel: 'Acrivity',
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
    NewChild: {
      screen: mkChldScreen,
      navigationOptions: {
        tabBarLabel: 'New Child',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'md-person-add'}
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
