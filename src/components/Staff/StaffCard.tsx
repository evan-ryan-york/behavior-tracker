import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CardHeader,
} from "@mui/material";
import SetPermissions from "./SetPermissions";
import { StaffInterface } from "../../interfaces/interfaces";

type Props = {
  staff: StaffInterface
}

export default function StaffCard({ staff }: Props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{ width: 70, height: 70 }} />}
          title={
            <Typography variant="cardTitle">
              {staff.firstName} {staff.lastName}
            </Typography>
          }
        />
        <CardContent>
            <SetPermissions staff={staff} />
        </CardContent>
      </Card>
    </Grid>
  );
}
