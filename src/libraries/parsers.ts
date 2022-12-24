import {
  HomeroomInterface,
  StudentInterface,
  StaffInterface,
  StaffFromAPIInterface,
} from "../interfaces/interfaces";

export const parseHomeroomResponse = (response: HomeroomInterface[]): HomeroomInterface[] =>
  response.map((homeroom: HomeroomInterface) => ({
    id: homeroom?.id ?? "",
    name: homeroom?.name ?? "",
    grade: homeroom?.grade ?? "",
  }));

export const parseStudentResponse = (response: StudentInterface[]): StudentInterface[] =>
  response.map((student: StudentInterface) => ({
    id: student?.id ?? "",
    childFirstName: student?.childFirstName ?? "",
    childLastName: student?.childLastName ?? "",
    enrollStatus: student?.enrollStatus ?? "",
    homeroom: student?.homeroom ?? "",
    SID: student?.SID ?? "",
  }));

export const parseStaffResponse = (response: StaffInterface[]): StaffInterface[] =>
  response.map((staff: StaffInterface) => ({
    id: staff?.id ?? "",
    firstName: staff?.firstName ?? "",
    lastName: staff?.lastName ?? "",
    email: staff?.email ?? "",
    permissions: staff?.permissions ?? [],
    homerooms: staff?.homerooms ?? [],
  }));
