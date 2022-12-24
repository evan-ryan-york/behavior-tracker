export interface StaffInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  permissions: string[];
  homerooms: string[];
}

export interface HomeroomInterface {
  id: string;
  name: string;
  grade: string;
}

export interface StudentInterface {
  id: string;
  childFirstName: string;
  childLastName: string;
  enrollStatus: string;
  homeroom: string;
  SID: string;
}

export interface StaffFromAPIInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  homerooms: string[];
}

export interface ColumnInterface {
    field: string;
    headerName: string;
    minWidth: number;
    headerClassName: string;
    cellClassName: string;
  }
