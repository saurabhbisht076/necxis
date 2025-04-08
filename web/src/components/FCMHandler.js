import { useEffect, useState } from 'react';

export default function FCMHandler() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        if (typeof event.data === 'string') {
          const trimmed = event.data.trim();

          // Only parse if it looks like valid JSON
          if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            const data = JSON.parse(trimmed);

            if (data.type === 'FCM_TOKEN' && data.token) {
              console.log('Received FCM token from WebView:', data.token);
              setFcmToken(data.token);

              if (typeof window !== 'undefined') {
                localStorage.setItem('fcmToken', data.token);
              }
            }
          } else {
            console.warn('Ignored non-JSON message:', event.data);
          }
        }
      } catch (error) {
        console.error('Error processing message:', error, event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return null;
}
