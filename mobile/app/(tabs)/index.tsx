import React, { useEffect } from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { 
  initializeFirebase, 
  requestNotificationPermission, 
  onMessageReceived 
} from '../../firebase.js'; // Corrected path to firebase.js

// If you're using @react-native-firebase/messaging, import the type
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export default function Index() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Firebase when the app starts
        await initializeFirebase();
        
        // Request push notification permissions
        const permissionGranted = await requestNotificationPermission();
        
        if (permissionGranted) {
          // Handle incoming push notifications with proper typing
          onMessageReceived((message: FirebaseMessagingTypes.RemoteMessage) => {
            if (message?.notification?.title) {
              Alert.alert('New Notification', message.notification.title);
            }
          });
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    
    initializeApp();
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* WebView to display your Next.js app */}
      <WebView
        source={{ uri: 'https://web-p1qmkhz0d-saurabhbisht076s-projects.vercel.app/' }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          // Handle message from the web app (if necessary)
          console.log('Message received:', event.nativeEvent.data);
        }}
      />
    </View>
  );
}