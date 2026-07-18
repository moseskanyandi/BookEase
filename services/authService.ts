import app, { auth } from '@/api/firebase';
import { UserRole } from '@/types';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const db = getFirestore(app);

/**
 * Sign up a new user with email and password, then save their profile (role, name, phone)
 */
export const signUp = async (
  email: string,
  password: string,
  role: UserRole,
  name: string,
  phone: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
      role,
      name,
      phone,
      createdAt: new Date().toISOString(),
    });

    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Fetch a user's profile (role, name, phone) from Firestore
 */
export const getUserProfile = async (uid: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return { profile: docSnap.data(), error: null };
    }
    return { profile: null, error: 'Profile not found' };
  } catch (error: any) {
    return { profile: null, error: error.message };
  }
};

/**
 * Log in an existing user with email and password
 */
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Log out the current user
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Send a password reset email
 */
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Subscribe to auth state changes (e.g. for a Context provider)
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
