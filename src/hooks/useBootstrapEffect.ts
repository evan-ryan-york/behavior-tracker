import { useEffect, useContext } from "react";
import useGetDocs from "./useGetDocs";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { staffAtom, loggedInStaffAtom } from "../recoil/atoms";
import { StaffInterface } from "../interfaces/interfaces";
import { AuthContext } from "../providers/AuthProvider";
import { parseStaffResponse } from "../libraries/parsers";

const useBootstrapEffect = () => {
  const { sendRequest: getDocs } = useGetDocs();
  const { currentAuthUser } = useContext(AuthContext);
  const staff = useRecoilValue(staffAtom);
  const setStaff = useSetRecoilState<StaffInterface[]>(staffAtom);
  const setLoggedInStaff = useSetRecoilState<StaffInterface | null>(loggedInStaffAtom);

  useEffect(() => {
    const getStaff = async () => {
      const response = await getDocs<StaffInterface>({ col: "staff" });
      if (response) {
        setStaff(parseStaffResponse(response));
      }
    };
    getStaff();
  }, [setStaff, getDocs]);

  useEffect(() => {
    if (!currentAuthUser || !staff) return;
    const filteredStaff = staff.filter(
      (staffMember) => staffMember.email === currentAuthUser.email
    );
    if (filteredStaff.length === 1) {
      setLoggedInStaff(filteredStaff[0]);
    } else {
      //generate message
      console.error(
        "[Hook] useBootstrapEffect - filtered Staff, no DB user found or multiple DB users found",
        currentAuthUser.email,
        filteredStaff.length
      );
    }
  }, [currentAuthUser, staff, setLoggedInStaff]);
};

export default useBootstrapEffect;
