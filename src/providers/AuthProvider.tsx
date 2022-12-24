import React, { createContext, useState, useEffect, useCallback } from "react";
import { signInWithPopup, UserCredential, User as FirebaseUser } from "firebase/auth";
import { auth, provider } from "../firebase";

interface AuthContextInterface {
  loading: boolean;
  currentAuthUser: FirebaseUser | null;
  logout: () => void;
  signInWithGoogle: () => void;
}

const initialState = () => ({
  currentAuthUser: null,
  logout: () => {},
  loading: false,
  signInWithGoogle: () => {},
});

const AuthContext = createContext<AuthContextInterface>(initialState());
export { AuthContext };

type Props = {
  children: JSX.Element;
};

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [currentAuthUser, setCurrentAuthUser] = useState<FirebaseUser | null>(null);

  const signInWithGoogle = useCallback(() => {
    setLoading(true);
    signInWithPopup(auth, provider).then(async ({ user }: UserCredential) => {
      if (!user || !user.email) {
        auth.signOut();
        setLoading(false);
        return;
      }
      user.email.split("@")[1] === "thegatheringplacek12.org" || auth.signOut();
    });
  }, []);

  const logout = useCallback(() => {
    setCurrentAuthUser(null);
    return auth.signOut();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
      if (user) {
        setCurrentAuthUser(user);
      } else {
        setCurrentAuthUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentAuthUser) {
      setLoading(false);
    }
  }, [currentAuthUser]);

  const value = {
    currentAuthUser,
    signInWithGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
