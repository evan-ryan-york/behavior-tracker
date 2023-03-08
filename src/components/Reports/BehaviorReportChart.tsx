import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CustomizedAxisTick from "./CustomizedAxisTick";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";

type ChartReport = {
  behaviorLabel: string;
  bars: ChartData[];
};

type ChartData = {
  name: string;
  amt: number;
};

type Props = {
  chart: ChartReport;
};

function BehaviorReportChart({ chart }: Props) {
  const organization = useRecoilValue(organizationAtom);
  const [ticks, setTicks] = useState<number[]>([]);
  const minWidth = chart.bars.length * 250;
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">{chart.behaviorLabel}</Typography>
        <ResponsiveContainer height={500} width={minWidth}>
          <BarChart
            data={chart.bars}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 3" />
            <XAxis
              dataKey="name"
              interval={0}
              height={60}
              tick={<CustomizedAxisTick ticks={ticks} setTicks={setTicks} />}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="amt"
              fill={organization?.secondaryColor ?? "#aaa"}
              name={chart.behaviorLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default BehaviorReportChart;
