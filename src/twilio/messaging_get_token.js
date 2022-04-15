import { getMessaging, getToken, onMessage } from "firebase/messaging";
import initFirebase from "../firebase/initFirebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const handleNotifications = async (conversationClientInstance) => {
  const app = initFirebase();
  const messaging = getMessaging(app);
  getToken(messaging, {
    vapidKey:
      "BCKyy_Oc4CJyg_k-j9QfVQyp4KE3Dao-hUpNAC3kNoQPeyT8QsjlUH8c2YvUPK0ZMPdDgYMql4d0FJGlCXzE0no",
  })
    .then((currentToken) => {
      if (currentToken) {
        // passing FCM token to the `conversationClientInstance` to register for push notifications
        console.log("currentToken", currentToken);
        conversationClientInstance
          .setPushRegistrationId("fcm", currentToken)
          .then((el) => console.log("el", el));

        // registering event listener on new message from firebase to pass it to the Conversations SDK for parsing
        onMessage((payload) => {
          conversationClientInstance.handlePushNotification(payload);
        });
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};
