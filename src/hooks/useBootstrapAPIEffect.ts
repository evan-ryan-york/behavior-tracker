import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { homeroomsAtom, studentsAtom, staffFromAPIAtom } from "../recoil/atoms";
import {
  HomeroomInterface,
  StaffFromAPIInterface,
  StudentInterface,
} from "../interfaces/interfaces";

export interface RawStudentInterface {
  id: string;
  childFirstName: string;
  childLastName: string;
  enrollStatus: string;
  homeroom: string;
  SID: string;
  SPED: boolean;
}

const useBootstrapAPIEffect = () => {
  const [loading, setLoading] = useState(false);
  const [homerooms, setHomerooms] = useRecoilState<HomeroomInterface[]>(homeroomsAtom);
  const [students, setStudents] = useRecoilState<StudentInterface[]>(studentsAtom);
  const [staffFromAPI, setStaffFromAPI] = useRecoilState<StaffFromAPIInterface[]>(staffFromAPIAtom);

  useEffect(() => {
    setLoading(true);
    if (homerooms.length > 0 && students.length > 0 && staffFromAPI.length > 0) {
      setLoading(false);
    }
  }, [homerooms, students, staffFromAPI]);

  useEffect(() => {
    const getHomerooms = async () => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        authorization: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
      };
      const response = await fetch(
        "https://us-central1-tgp-core-api.cloudfunctions.net/app/api/homerooms",
        {
          headers: headers,
        }
      );
      const json = await response.json();
      setHomerooms(json);
    };
    getHomerooms();
  }, [setHomerooms]);

  useEffect(() => {
    const getStudents = async () => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        authorization: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
      };
      const response = await fetch(
        "https://us-central1-tgp-core-api.cloudfunctions.net/app/api/students",
        {
          headers: headers,
        }
      );
      const studentList = await response.json();
      setStudents(studentList);
    };
    getStudents();
  }, [setStudents]);

  useEffect(() => {
    const getStaff = async () => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        authorization: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
      };
      const response = await fetch(
        "https://us-central1-tgp-core-api.cloudfunctions.net/app/api/staff",
        {
          headers: headers,
        }
      );
      const jsonStaff = await response.json();
      setStaffFromAPI(jsonStaff);
    };
    getStaff();
  }, [setStaffFromAPI]);

  return loading;
};

export default useBootstrapAPIEffect;
