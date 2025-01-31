import { initializeApp } from "firebase/app"
import { getMessaging,getToken,} from "firebase/messaging"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)
const VAPID_KEY = process.env.REACT_APP_FIREBASE_VAPID_KEY

export const requestNotificationPermission = async () => {
  try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (token) {
          console.log("Token retrieved:", token);
        } else {
          console.log("No token available.");
        }
      } else if (permission === "denied") {
        alert('Notification permission denied');
      }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

