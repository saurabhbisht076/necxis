# Next.js with Expo Mobile Integration

This project demonstrates a **Next.js** web application with **Google Sign-Up** integrated into an **Expo Android app** using **WebView** and native **Firebase Cloud Messaging (FCM)** for push notifications.

## Project Structure

- `/web` - Next.js web application with **MUI** and **Google Sign-Up**
- `/mobile` - Expo/React Native Android application with **WebView** integration and **FCM**

## Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (v16+)
- **npm** or **yarn**
- **Android Studio** (for Android development)
- **Java Development Kit (JDK 11+)**
- **Android SDK**
- A **Firebase project** with **FCM** set up

## Setup Instructions

### Web Application

1. Navigate to the web directory:
   ```bash
   cd web
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Google OAuth credentials:
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   ```

4. Add Firebase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```
   Your web app will be available at [http://localhost:3000](http://localhost:3000).

6. Build for production:
   ```bash
   npm run build
   npm run start
   ```
   Your web app will be available at [http://localhost:3000](http://localhost:3000).

### Mobile Application

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your Firebase configuration:
   - Download the `google-services.json` file from the Firebase Console
   - Place the `google-services.json` file in the `mobile/android/app/` directory

4. Update the WebView URL in `app/(tabs)/index.tsx` to point to your deployed Next.js application:
   ```javascript
   <WebView
     source={{ uri: 'https://your-deployed-nextjs-app.com' }}
     // other WebView settings
   />
   ```

5. Run the Android application:
   ```bash
   npx react-native run-android
   ```
   This will start your app on the connected Android device/emulator.

### Firebase Cloud Messaging Setup

1. Create a Firebase project at Firebase Console.
2. Add an Android app to your Firebase project.
3. Download the `google-services.json` file and place it in `mobile/android/app/`.
4. Configure your app's `build.gradle` files as shown in the Firebase console (make sure to add dependencies for Firebase Messaging).
5. The mobile app is already configured to request notification permissions and handle incoming notifications.

### Testing Push Notifications

You can test FCM notifications by sending test messages from the Firebase Console:

1. Go to your Firebase project.
2. Navigate to Cloud Messaging.
3. In the Send Your First Message section, enter the title and body of your notification.
4. Under Target, select the FCM token option and paste the token generated in your mobile app.
5. Send the test message to the app.

### Troubleshooting

#### WebView Issues

- Ensure `react-native-webview` is properly installed.
- For Android, make sure your app has proper internet permissions in `AndroidManifest.xml`.

#### FCM Issues

- Verify that the `google-services.json` file is correctly placed in the `android/app/` directory.
- Check that Firebase dependencies are correctly configured in Gradle files.
- Make sure the device has Google Play Services installed.
# Firebase Authentication Setup

If you're encountering the `auth/unauthorized-domain` error after deploying your app, it's likely because your deployed domain is not added to Firebase's authorized domains list.

## Steps to Resolve

1. **Go to the Firebase Console**:
   - Navigate to the [Firebase Console](https://console.firebase.google.com/).

2. **Select Your Project**:
   - Choose the project you are working on from the list of projects.

3. **Open Authentication Settings**:
   - In the left sidebar, click on **Authentication**.
   - Go to the **Sign-in method** tab.

4. **Authorized Domains**:
   - Scroll down to the **Authorized domains** section.

5. **Add Your Deployed Domain**:
   - Click on **Add domain**.
   - Enter your deployed domain (e.g., `your-deployed-app.vercel.app`).
   - Add `localhost` (for local development) to the list as well.

6. **Save Changes**:
   - Click **Save** to save your changes.

## Example

If your deployed domain is `https://your-deployed-app.vercel.app`, add this domain to the list. For local development, add `localhost` or `localhost:3000`.

## Redeploy Your App

After completing these steps, redeploy your app. The authentication issue should now be resolved.


### Development Notes

- The web application is built with Next.js and MUI.
- Google Sign-Up is implemented using NextAuth.js.
- The mobile app uses React Native with Expo.
- WebView is used to display the web application within the mobile app.
- Firebase Cloud Messaging is integrated natively (not using Expo's notification service).

### License

MIT

### Key Points

1. Replace `your_firebase_api_key`, `your_firebase_auth_domain`, etc., in the `.env.local` file with the actual values from your Firebase project.
2. Do **not commit sensitive information** such as API keys to version control. Make sure the `.env.local` file is added to your `.gitignore`.
