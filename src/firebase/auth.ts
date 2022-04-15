import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  User,
  UserCredential,
} from 'firebase/auth';
import initFirebase from './initFirebase';

const firebaseAuth = getAuth(initFirebase());

const registerFirebase = async (email: string, password: string) => {
  const result: { data?: Partial<User>; error?: unknown } = {};
  try {
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    result.data = user;
  } catch (error) {
    result.error = error;
  }
  return result;
};

const login = async (email: string, password: string) => {
  let result: { data?: Partial<UserCredential>; error?: unknown } = {};
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    result.data = response;

    if (!response?.user?.uid) result = await registerFirebase(email, password);
  } catch (error) {
    result.error = error;
  }
  return result;
};

const logoutFirebase = async () => {
  await signOut(firebaseAuth);
};

export { registerFirebase, login, logoutFirebase, firebaseAuth };
