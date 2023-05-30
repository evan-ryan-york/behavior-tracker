import { Box, Button, Card, CardContent, CardHeader, Grid, Link, Typography } from "@mui/material";
import React from "react";

type Benefit = {
  label: string;
  image: string;
};

type Plan = "individual" | "organization" | null;

type Props = {
  annual: boolean;
  setSelectedPlan: (pV: Plan) => void;
};

const benefits: Benefit[] = [
  {
    label: "Unlimited Number of Behavior Plans / Child",
    image: "../feature_check.png",
  },
  {
    label: "Unlimited Number of Observations / Child",
    image: "../feature_check.png",
  },
  {
    label: "Unlimited Number of Behavior Surveys / Child",
    image: "../feature_check.png",
  },
  {
    label: "Up to 5 Children",
    image: "../feature_check.png",
  },
  {
    label: "Library of Strategies for all Behaviors and Functions of Behavior",
    image: "../feature_check.png",
  },
  {
    label: "Unlimited Users",
    image: "../feature_x.png",
  },
  {
    label: "User Permission Management for FERPA Compliance",
    image: "../feature_x.png",
  },
  {
    label: "Collaboration between Teachers, Evaluators, and School Administration",
    image: "../feature_x.png",
  },
];

function IndividualAccountCard({ annual, setSelectedPlan }: Props) {
  const IMAGE_SIZE = "25px";

  const handleClick = () => {
    setSelectedPlan("individual");
  };

  return (
    <>
      <Card variant="elevation" sx={{ textAlign: "center" }}>
        <CardHeader title="Individual User Plan"></CardHeader>
        <CardContent>
          <Box px={1}>
            <Typography variant="h4" component="h2" gutterBottom={true}>
              {annual ? "$250" : "$25"}
              <Typography variant="h6" color="textSecondary" component="span">
                {annual ? "/year" : "/month"}
              </Typography>
            </Typography>
            {benefits.map((benefit) => (
              <Grid
                key={benefit.label}
                container
                spacing={1}
                sx={{ alignItems: "center", textAlign: "left", mt: "4px" }}
              >
                <Grid item xs={2}>
                  <img src={benefit.image} width={IMAGE_SIZE} alt="plan" />
                </Grid>
                <Grid item xs={10}>
                  <Typography color="textSecondary" variant="subtitle1" component="p">
                    {benefit.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleClick}>
            Select Plan
          </Button>
          <Box mt={2}>
            <Link href="#" color="secondary">
              Learn More
            </Link>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default IndividualAccountCard;
