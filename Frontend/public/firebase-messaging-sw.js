importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCalzB6xLiUZ3dHBGiLmk3c2q1I2EY-36I",
  authDomain: "mayoorapp-d73d2.firebaseapp.com",
  projectId: "mayoorapp-d73d2",
  storageBucket: "mayoorapp-d73d2.firebasestorage.app",
  messagingSenderId: "310581028042",
  appId: "1:310581028042:web:956ec4e10b520ceaebc033",
  measurementId: "G-9HMZTG30NV"
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});