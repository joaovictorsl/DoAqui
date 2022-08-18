import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { SignUpScreen } from '../SignUp/SignUp';
import { LogInScreen } from '../LogIn/LogIn';

const Stack = createStackNavigator();

export const AuthScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='signUp' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="logIn" component={LogInScreen} />
    </Stack.Navigator>
  )
}