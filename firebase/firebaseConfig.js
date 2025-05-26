import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvU5n5vC30TOnIhRfj7tbUoHE9iJFdEAc",
  authDomain: "student-task-manager-819ff.firebaseapp.com",
  projectId: "student-task-manager-819ff",
  storageBucket: "student-task-manager-819ff.firebasestorage.app",
  messagingSenderId: "480675105201",
  appId: "1:480675105201:web:cc0b864b5ddd3b303ad590"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ... inside your Login component

const handleSignUp = async (e) => {
  e.preventDefault();
  setError('');
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    router.push('/');
  } catch (error) {
    console.error("Sign up error:", error);
    setError('Failed to create an account. ' + error.message);
  }
};

// Add a sign-up button to your form
<button
  type="button"
  onClick={handleSignUp}
  className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
>
  Sign Up
</button>