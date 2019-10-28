import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen} from './pages/login';
import {signUpScreen} from './pages/signup';
import {accountScreen} from './pages/parent/account';
import {childHome} from './pages/child/cHome';
import {parentHome} from './pages/parent/pHome';
import {loadingScreen} from './pages/loading';
import {HomeScreen} from './pages/appHome';
import logout from './pages/logout';

const childStack = createStackNavigator({
  cHome: childHome,
});
const parentStack = createStackNavigator({
  pHome: parentHome,
  Other: accountScreen,
});

const AuthStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Signup: signUpScreen,
  Logout: logout,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: loadingScreen,
      Child: childStack,
      Parent: parentStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
