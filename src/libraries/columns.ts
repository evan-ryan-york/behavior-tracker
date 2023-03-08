import { Column } from "../types/types";
export const perChildColumns: Column[] = [
  {
    field: "firstName",
    headerName: "First Name",
    minWidth: 100,
    headerClassName: "tableHeader",
    cellClassName: "hoverPointer",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    minWidth: 100,
    headerClassName: "tableHeader",
    cellClassName: "hoverPointer",
  },
  {
    field: "homeroom",
    headerName: "Homeroom",
    minWidth: 150,
    headerClassName: "tableHeader",
    cellClassName: "hoverPointer",
  },
  {
    field: "count",
    headerName: "Total",
    minWidth: 90,
    headerClassName: "tableHeader",
    cellClassName: "hoverPointer",
  },
];
