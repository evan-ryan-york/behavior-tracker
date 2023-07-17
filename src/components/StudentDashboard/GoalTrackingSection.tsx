import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue } from "recoil";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { behaviorPlansAtom } from "../../recoil/behaviorPlansAtoms";
import { BehaviorPlanRecord } from "../../types/types";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import GoalTrackingChart from "./GoalTrackingChart";
import useCalculateGoalFrequency from "../../hooks/useCalculateGoalFrequency";

type ChartData = {
  name: string;
  Goal: number;
  ["Incidents Per Day"]: number;
};

const GoalTrackingSection = () => {
  const organization = useRecoilValue(organizationAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const behaviorPlans = useRecoilValue(behaviorPlansAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedBehaviorPlan, setSelectedBehaviorPlan] = useState<BehaviorPlanRecord | null>(null);
  const { calculateGoalFrequency } = useCalculateGoalFrequency();

  useEffect(() => {
    if (!behaviorPlans || !selectedStudent || !selectedStudent.activeBehaviorPlan) return;

    const tempSelectedBehaviorPlan = behaviorPlans.find(
      (behaviorPlan) => behaviorPlan.id === selectedStudent.activeBehaviorPlan
    );
    if (!tempSelectedBehaviorPlan) return;
    const goal =
      tempSelectedBehaviorPlan.frequencyDenominator === "Day"
        ? tempSelectedBehaviorPlan.frequencyNumerator
        : tempSelectedBehaviorPlan.frequencyDenominator === "Week"
        ? tempSelectedBehaviorPlan.frequencyNumerator / 5
        : tempSelectedBehaviorPlan.frequencyNumerator * 8;
    setSelectedBehaviorPlan(tempSelectedBehaviorPlan);
    const weeksArray = calculateGoalFrequency(tempSelectedBehaviorPlan.targetBehavior);
    const tempArray: ChartData[] = [];
    weeksArray.forEach((week) => {
      tempArray.push({
        name: `${week.startDate} - ${week.endDate}`,
        Goal: goal,
        "Incidents Per Day": Math.round(week.incidentsPerHour * 8),
      });
    });
    setChartData(tempArray);
  }, [behaviorPlans, calculateGoalFrequency, selectedStudent]);
  const loading =
    selectedStudent &&
    selectedStudent.activeBehaviorPlan &&
    organization &&
    selectedBehaviorPlan &&
    behaviorsObj &&
    behaviorsObj[selectedBehaviorPlan.targetBehavior];
  return (
    <>
      {loading && (
        <Paper>
          <Box
            sx={{
              padding: 1,
              backgroundColor: organization.primaryColor,
              color: organization.primaryTextColor,
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Goal Tracking</Typography>
          </Box>
          <Box sx={{ padding: 2, height: 400, overflow: "scroll" }}>
            <Typography variant="h5">{`The Target Behavior In The Active Behavior Plan is ${
              behaviorsObj[selectedBehaviorPlan.targetBehavior].label
            }`}</Typography>
            <Typography variant="h6">{`The goal is to see the target behavior no more than ${
              selectedBehaviorPlan.frequencyNumerator
            } ${selectedBehaviorPlan.frequencyNumerator === 1 ? "time" : "times"} per ${
              selectedBehaviorPlan.frequencyDenominator
            }`}</Typography>
            <GoalTrackingChart data={chartData} />
          </Box>
        </Paper>
      )}
    </>
  );
};

export default GoalTrackingSection;
