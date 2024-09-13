import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {LogBox, View, Text, Image, StatusBar} from 'react-native';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import './ignoreWarnings';
import GetNotif from './src/GetNotification';
import messaging, {firebase} from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';
import Images from './src/assets/images';
import colors from './src/utils/colors';
import Icons from './src/assets/icons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
  "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package.",
]);
LogBox.ignoreAllLogs();

const App = () => {
  const popupRef = useRef(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '37878297891-qhf1b0b2umeq93bqf5snu975qif28a2i.apps.googleusercontent.com',
    });
    requestUserPermission();
    GetNotif();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      // console.log('fcm token===>>', authStatus)
      // dispatch(fcmToken)
    }
  };

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // InAppNotifications(remoteMessage.notification)
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onMessage(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      InAppNotifications(remoteMessage);
      // InAppNotifications(remoteMessage.notification)
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
            // alert(remoteMessage.notification.body)
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  const InAppNotifications = remoteMessage => {
    if (popupRef.current) {
      popupRef.current?.show({
        appIconSource: Icons.notificationIcon,
        appTitle: 'AutoTrader',
        timeText: 'Now',
        title: 'New Notification',
        body:
          remoteMessage?.notification?.body ||
          remoteMessage?.notification?.title,
        slideOutTime: 5000,
      });
    }
  };

  const renderCustomPopup = ({
    appIconSource,
    appTitle,
    timeText,
    title,
    body,
  }) => (
    <View
      style={{
        width: '90%',
        minHeight: 80,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: colors.placeholderColor,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.appButtonColor,
          }}>
          {appTitle}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: colors.appButtonColor,
          }}>
          {timeText}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: colors.appInputTextColor,
          marginVertical: 10,
        }}>
        {body}
      </Text>
    </View>
  );

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <GestureHandlerRootView style={{flex: 1}}>
        <Routes />
      </GestureHandlerRootView>
      <NotificationPopup
        ref={popupRef}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </Provider>
  );
};

export default App;
