import { getToken } from "firebase/messaging";
import { VAPID_KEY, messaging } from "./firebase";
export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log("+++ token", token);
    } else if (permission === "denied") {
      alert('permission === "denied"');
    }
  }
};