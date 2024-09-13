import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from "react-redux";
import { StackActions } from '@react-navigation/native';

// Screens
import Home from "../screens/Home";
import Dealers from "../screens/Dealers";
import Add from "../screens/Add";
import Notification from "../screens/Notification";
import Settings from "../screens/Settings";
import colors from "../utils/colors";
import Icons from "../assets/icons";
import UserProfile from "../screens/UserProfile";
import Details from "../screens/Details";
import CarDetails from "../screens/CarDetails";
import AboutUs from "../screens/AboutUs";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import DealerPage from "../screens/DealerPage";
import TermsAndConditions from "../screens/TermsAndConditions";
import PartsListing from "../screens/PartsListing";
import DealersList from "../screens/DealersList";
import MyAdverts from "../screens/MyAdverts";
import ChangePassword from "../screens/ChangePassword";
import SearchListing from "../screens/SearchListing";
import Services from "../screens/Services";
import ServiceDetails from "../screens/ServiceDetails";
import ViewService from "../screens/ViewService";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const SettingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    )
}

const BottomTabStack = ({ navigation }) => {

    const { authenticationToken } = useSelector(state => state.userSession)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { height: 100 }
            }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? colors.warningRed : colors.appGolden
                                    }}
                                    resizeMode='contain'
                                    source={Icons.homeIcon}
                                />
                                <Text style={{
                                    color: focused ? colors.warningRed : colors.appGolden,
                                    fontWeight: "400",
                                    marginTop: 5,
                                    fontSize: 12
                                }}>Home</Text>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Explore" component={Dealers}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? colors.warningRed : colors.appGolden
                                    }}
                                    resizeMode='contain'
                                    source={Icons.carDealerIcon}
                                />
                                <Text style={{
                                    color: focused ? colors.warningRed : colors.appGolden,
                                    fontWeight: "400",
                                    marginTop: 5,
                                    fontSize: 12
                                }}>Dealers</Text>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Add" component={Add}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity style={{
                                width: "auto",
                                alignItems: "center",
                            }}
                                onPress={() => {
                                    if (authenticationToken) navigation.navigate("Add")
                                    else navigation.dispatch(StackActions.replace('AuthStack'))
                                }}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? colors.warningRed : colors.appGolden
                                    }}
                                    resizeMode='contain'
                                    source={Icons.addIcon}
                                />
                                <Text style={{
                                    color: focused ? colors.warningRed : colors.appGolden,
                                    fontWeight: "400",
                                    marginTop: 5,
                                    fontSize: 12
                                }}>Add</Text>
                            </TouchableOpacity>
                        )
                    }
                }} />
            <Tab.Screen name="Notification" component={Notification}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity style={{
                                width: "auto",
                                alignItems: "center",
                            }}
                                onPress={() => {
                                    if (authenticationToken) navigation.navigate("Notification")
                                    else navigation.dispatch(StackActions.replace('AuthStack'))
                                }}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? colors.warningRed : colors.appGolden
                                    }}
                                    resizeMode='contain'
                                    source={Icons.notificationIcon}
                                />
                                <Text style={{
                                    color: focused ? colors.warningRed : colors.appGolden,
                                    fontWeight: "400",
                                    marginTop: 5,
                                    fontSize: 12
                                }}>Notification</Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <Tab.Screen name="Profile" component={SettingStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity style={{
                                width: "auto",
                                alignItems: "center",
                            }}
                                onPress={() => {
                                    if (authenticationToken) navigation.navigate("Profile")
                                    else navigation.dispatch(StackActions.replace('AuthStack'))
                                }}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? colors.warningRed : colors.appGolden
                                    }}
                                    resizeMode='contain'
                                    source={Icons.settingIcon}
                                />
                                <Text style={{
                                    color: focused ? colors.warningRed : colors.appGolden,
                                    fontWeight: "400",
                                    marginTop: 5,
                                    fontSize: 12
                                }}>Profile</Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const HomeStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="BottomTabStack"
        >
            <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="CarDetails" component={CarDetails} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="DealerPage" component={DealerPage} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PartsListing" component={PartsListing} />
            <Stack.Screen name="DealersList" component={DealersList} />
            <Stack.Screen name="MyAdverts" component={MyAdverts} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="SearchListing" component={SearchListing} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
            <Stack.Screen name="ViewService" component={ViewService} />
        </Stack.Navigator>
    )
}
export default HomeStack;