import { useEffect } from "react";
import useGetDocs from "./useGetDocs";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { staffAtom, loggedInStaffAtom } from "../recoil/atoms";
import { StaffInterface } from "../interfaces/interfaces";
import { useAuth } from "./useAuth";

const parseStaffResponse = (response: StaffInterface[]): StaffInterface[] =>
  response.map((staff: StaffInterface) => ({
    id: staff?.id ?? "",
    firstName: staff?.firstName ?? "",
    lastName: staff?.lastName ?? "",
    email: staff?.email ?? "",
    permissions: staff?.permissions ?? [],
  }));

const useBootstrapEffect = () => {
  const { sendRequest: getDocs } = useGetDocs();
  const { currentAuthUser } = useAuth();
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
