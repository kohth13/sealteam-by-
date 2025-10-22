import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { getFirebaseAuth } from '../firebase';

export type UserRole = 'guest' | 'student' | 'instructor' | 'admin';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Determine user role based on email
        if (firebaseUser.email === 'admin@example.com') {
          setUserRole('admin');
        } else if (firebaseUser.email === 'instructor@example.com') {
          setUserRole('instructor');
        } else {
          setUserRole('student');
        }
      } else {
        setUserRole('guest');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setUserRole('guest');
  };

  return {
    user,
    userRole,
    loading,
    signup,
    login,
    logout
  };
};
