// mobile/firebase.js
import messaging from '@react-native-firebase/messaging';

export const initializeFirebase = async () => {
  try {
    // Register background handler for FCM messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
};

// Function to get the FCM token
export const getFCMToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
};

// Function to request notification permissions
export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  console.log('Authorization status:', authStatus);
  return enabled;
};

// Function to handle incoming messages (foreground)
export const onMessageReceived = (handler) => {
  messaging().onMessage(async remoteMessage => {
    console.log('Message received in the foreground!', remoteMessage);
    handler(remoteMessage);
  });
};
