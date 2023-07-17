import {
  ComposedChart,
  Line,
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

type ChartData = {
  name: string;
  Goal: number;
  ["Incidents Per Day"]: number;
};

type Props = {
  data: ChartData[];
};

const GoalTrackingChart = ({ data }: Props) => {
  const organization = useRecoilValue(organizationAtom);

  return (
    <>
      {organization && (
        <ResponsiveContainer width="100%" height="82%">
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              label="Incidents Per Day"
              dataKey="Incidents Per Day"
              barSize={40}
              fill={organization.primaryColor}
            />
            <Line type="monotone" dataKey="Goal" stroke={organization.secondaryColor} />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default GoalTrackingChart;
