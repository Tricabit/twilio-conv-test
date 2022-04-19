import { getMessaging, getToken, onMessage } from "firebase/messaging";
import initFirebase from "../firebase/initFirebase";

export const handleNotifications = async (conversationClientInstance) => {
  const app = initFirebase();
  const messaging = getMessaging(app);
  getToken(messaging, {
    vapidKey:
      "BCKyy_Oc4CJyg_k-j9QfVQyp4KE3Dao-hUpNAC3kNoQPeyT8QsjlUH8c2YvUPK0ZMPdDgYMql4d0FJGlCXzE0no",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("currentToken", currentToken);
        conversationClientInstance
          .setPushRegistrationId("fcm", currentToken)
          .then((el) => console.log("el", el));
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
