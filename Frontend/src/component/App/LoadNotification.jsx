import React from 'react'
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging, requestNotificationPermission } from '../../Helper/firebase';

const LoadNotification = () => {

      useEffect(() => {
        requestNotificationPermission();
    
        onMessage(messaging, (payload) => {
          console.log("Received foreground message:", payload);
          const { title, body } = payload.notification || {};
    
          new Notification({ title, body });
          
        });
      }, []);


  return
}

export default LoadNotification