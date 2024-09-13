import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Splash from "../screens/Splash";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator()

const Routes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="HomeStack" component={HomeStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;