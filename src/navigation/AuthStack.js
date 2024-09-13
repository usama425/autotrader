import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/forgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};
export default AuthStack;
