import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import WebViewScreen from './components/WebViewScreen';
import { initializeFirebase } from './firebase';

export default function App() {
  useEffect(() => {
    // Initialize Firebase when app starts
    initializeFirebase();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <WebViewScreen />
    </>
  );
}