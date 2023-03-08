import React, { createContext, useState, useEffect, useCallback } from "react";
import { signInWithPopup, UserCredential, User as FirebaseUser } from "firebase/auth";
import useGetDocs from "../hooks/useGetDocs";
import { auth, provider } from "../firebase";
import { useSetRecoilState } from "recoil";
import { loggedInStaffAtom } from "../recoil/staffAtoms";
import { StaffRecord } from "../types/types";
import { parseStaffResponse } from "../libraries/parsers";

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
  const { sendRequest: getDocs } = useGetDocs();
  const setLoggedInStaff = useSetRecoilState(loggedInStaffAtom);

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
    return auth.signOut();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
      if (user) {
        setCurrentAuthUser(user);
        const staffRecord = await getStaffRecord(user);
        staffRecord ? setLoggedInStaff(staffRecord) : auth.signOut();
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
