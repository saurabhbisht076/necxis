import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';

const WebViewScreen = () => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState(null);
  
  // URL to your deployed Next.js app
  const WEB_URL = 'https://web-p1qmkhz0d-saurabhbisht076s-projects.vercel.app/';
  
  // Request notification permissions and get FCM token
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      }
    };

    const getFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        setFcmToken(token);
      } catch (error) {
        console.error('Failed to get FCM token:', error);
      }
    };

    requestUserPermission();

    // Listen for FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM message received:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'New Message',
        remoteMessage.notification?.body || 'You received a new notification'
      );
    });

    return unsubscribe;
  }, []);

  // Send FCM token to WebView when available
  useEffect(() => {
    if (fcmToken && webViewRef.current) {
      const tokenScript = `
        window.postMessage(
          JSON.stringify({ type: 'FCM_TOKEN', token: '${fcmToken}' }),
          '*'
        );
      `;
      webViewRef.current.injectJavaScript(tokenScript);
    }
  }, [fcmToken]);

  // Handle messages from WebView
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('Message from WebView:', data);
      
      // Process messages from the web app
      if (data.type === 'LOGOUT') {
        // Handle logout if needed
      }
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }
  };

  // Script to listen for token in the WebView
  const injectedJavaScript = `
    window.addEventListener('message', function(event) {
      console.log('Message received in WebView:', event.data);
      // Handle messages here if needed
    });
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
        </View>
      )}
      
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
});

export default WebViewScreen;