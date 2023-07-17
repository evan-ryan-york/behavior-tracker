import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  signInWithPopup,
  UserCredential,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useGetDocs from "../hooks/useGetDocs";
import { auth, provider } from "../firebase";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { loggedInStaffAtom } from "../recoil/staffAtoms";
import { StaffRecord } from "../types/types";
import { parseStaffResponse } from "../libraries/parsers";
import { organizationAtom } from "../recoil/organizationAtoms";

type EmailPasswordProps = { email: string; password: string };

interface AuthContextInterface {
  loading: boolean;
  currentAuthUser: FirebaseUser | null;
  logout: () => void;
  loginError: string | null;
  signInWithGoogle: () => void;
  createUser: ({ email, password }: EmailPasswordProps) => void;
  emailSignIn: ({ email, password }: EmailPasswordProps) => void;
}

const initialState = () => ({
  currentAuthUser: null,
  logout: () => {},
  loading: false,
  loginError: null,
  signInWithGoogle: () => {},
  createUser: () => {},
  emailSignIn: () => {},
});

const AuthContext = createContext<AuthContextInterface>(initialState());
export { AuthContext };

type Props = {
  children: JSX.Element;
};

const loginErrors: { [key: string]: string } = {
  "auth/user-not-found": "Email not found",
  "auth/wrong-password": "Incorrect password",
};

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [currentAuthUser, setCurrentAuthUser] = useState<FirebaseUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { sendRequest: getDocs } = useGetDocs();
  const setLoggedInStaff = useSetRecoilState(loggedInStaffAtom);
  const resetOrganization = useResetRecoilState(organizationAtom);

  const getStaffRecord = useCallback(
    async (user: FirebaseUser) => {
      const matchingStaff = await getDocs<StaffRecord>({
        col: "staff",
        config: { where: ["email", "==", user.email] },
      });
      const parsedResults = parseStaffResponse(matchingStaff);
      if (parsedResults.length === 0) {
        console.log("No Matching User");
      } else if (parsedResults.length > 1) {
        console.log("Multiple Matching Users");
      } else {
        return parsedResults[0];
      }
    },
    [getDocs]
  );

  const createUser = ({ email, password }: EmailPasswordProps) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        //auth/email-already-in-use
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Create Error: ", errorCode);
        // ..
      });
  };

  const emailSignIn = ({ email, password }: EmailPasswordProps) => {
    let message: string | null = null;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoginError(null);
      })
      .catch((error) => {
        const errorMessage = loginErrors[error.code];
        console.log(errorMessage);
        message = errorMessage ? errorMessage : "Unknown Error";
        setLoginError(message);
      });
  };

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    signInWithPopup(auth, provider).then(async ({ user }: UserCredential) => {
      if (!user || !user.email) {
        auth.signOut();
        setLoading(false);
        return;
      }
      const staffRecord = await getStaffRecord(user);
      staffRecord ? setLoggedInStaff(staffRecord) : auth.signOut();
    });
  }, [getStaffRecord, setLoggedInStaff]);

  const logout = useCallback(() => {
    setCurrentAuthUser(null);
    resetOrganization();
    return auth.signOut();
  }, [resetOrganization]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
      if (user) {
        setCurrentAuthUser(user);
        const staffRecord = await getStaffRecord(user);
        if (staffRecord) {
          setLoggedInStaff(staffRecord);
        } else {
          auth.signOut();
        }
      } else {
        setCurrentAuthUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [getStaffRecord, setLoggedInStaff]);

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
    createUser,
    emailSignIn,
    loginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
