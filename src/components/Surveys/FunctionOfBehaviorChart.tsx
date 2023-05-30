import { Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

function FunctionOfBehaviorChart({ chart }: Props) {
  const organization = useRecoilValue(organizationAtom);
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <ResponsiveContainer height={400} minWidth={600}>
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
            <XAxis  dataKey="name" interval={0} height={30} angle={0} />
            <YAxis />
            <Tooltip />
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

export default FunctionOfBehaviorChart;
