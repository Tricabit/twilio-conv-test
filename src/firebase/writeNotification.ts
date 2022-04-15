import { getDatabase, push, ref, set } from 'firebase/database';
import _ from 'lodash';
import { User } from '../../components/utils/clientAPIs';
import firebaseApp from './initFirebase';

export interface INotification {
  room?: string;
  message?: string;
  from: Partial<User>;
  to: string;
  type: NotificationType;
  isRead: boolean;
  comment?: string;
  commentId?: string | null;
  entityId?: string;
  activeNotify: boolean;
  createdAt: string;
  isConsumed?: boolean;
}

export enum NotificationType {
  MESSAGE = 'message',
  QUESTION_COMMENT = 'question_comment',
  FOLLOW_QUESTION = 'follow_question',
  FOLLOW_USER = 'follow_user',
  FOLLOW_ROOM = 'follow_room',
}

const writeNotification = (uid: string, notification: INotification) => {
  // Get a reference to the database service
  const db = getDatabase(firebaseApp());
  const notsRef = ref(db, `notifications/${uid}`);
  const newNotification = push(notsRef);
  set(newNotification, {
    notification,
  });
};

export default writeNotification;
