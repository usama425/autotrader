import { Platform } from "react-native";

import { Notifications } from 'react-native-notifications';

import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";


const id = "47f53b9c-a291-4c36-8818-aef21e8277b7"
const donutsInterest = 'debug-a';
export default async function GetNotif() {
  // const user = await AsyncStorage.getItem('user')
  // let userParsed=JSON.parse(user) //USING USER ID AS INTEREST

  // if(userParsed){

  //   init(userParsed.id)


  // }
  init("debug-all")
}
// Initialize notifications
const init = (user_id) => {
  // Set your app key and register for push
  RNPusherPushNotifications.setInstanceId(id);
  // Init interests after registration
  RNPusherPushNotifications.on('registered', () => {
    if (Platform.OS === 'ios') setSubscriptions(`${user_id}`);
    else subscribe(`${user_id}`);
  });
  // Setup notification listeners
  RNPusherPushNotifications.on('notification', handleNotification);
  // Optionally you can assign the listeners to variables so you can clean them up later.
  //    const listener = RNPusherPushNotifications.on('registered', () => {});
  //    listener.remove();
};
// Handle notifications received
const handleNotification = notification => {
  // iOS app specific handling
  AsyncStorage.setItem("newnotif", "1")
  if (Platform.OS === 'ios') {
    switch (notification.appState) {
      case 'inactive':

      // inactive: App came in foreground by clicking on notification.
      //           Use notification.userInfo for redirecting to specific view controller
      case 'background':
        console.log('back ground', notification);

      // background: App is in background and notification is received.
      //             You can fetch required data here don't do anything with UI
      case 'active':
        Notifications.postLocalNotification({
          title: notification.title,
          body: notification.body,
          extra: "data"
        })
      // App is foreground and notification is received. Show a alert or something.
      default:
        break;
    }
  }
  else {

    Notifications.postLocalNotification({
      title: notification.title,
      body: notification.body,
      extra: "data"
    })

  }
};
// Subscribe to an interest
const subscribe = interest => {
  // Note that only Android devices will respond to success/error callbacks
  RNPusherPushNotifications.subscribe(
    interest,
    (statusCode, response) => {
      // console.error("error===>>", statusCode, response);
    },
    () => {
      // console.log('Success');
    }
  );
};






const setSubscriptions = interest => {
  // Note that only Android devices will respond to success/error callbacks
  RNPusherPushNotifications.setSubscriptions(
    interest,
    (statusCode, response) => {
      console.error(statusCode, response);
    },
    () => {
      console.log('Notification Subscribed Success');
    }
  );
};




// Unsubscribe from an interest
const unsubscribe = interest => {
  RNPusherPushNotifications.unsubscribe(
    interest,
    (statusCode, response) => {
      console.tron.logImportant(statusCode, response);
    },
    () => {
      console.tron.logImportant('Success');
    }
  );
}; 