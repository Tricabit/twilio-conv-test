import { child, getDatabase, push, ref, set, update } from "firebase/database";
import _ from "lodash";
import firebaseApp from "./initFirebase";

const readNotification = (to: string, id: string) => {
  const db = getDatabase(firebaseApp());
  const updates: any = {};
  updates[`notifications/${to}/${id}/isRead`] = true;
  return update(ref(db), updates);
};

export default readNotification;
