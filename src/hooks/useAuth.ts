import { useEffect, useState, useCallback } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, UserCredential, User as FirebaseUser } from "firebase/auth";

export const useAuth = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInWithGoogle = useCallback(() => {
    setIsLoading(true);
    signInWithPopup(auth, provider).then(async ({ user }: UserCredential) => {
      if (!user || !user.email) {
        auth.signOut();
        setIsLoading(false);
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
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { currentAuthUser, isLoading, signInWithGoogle, logout };
};
