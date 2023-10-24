import { useContext, useEffect, useState } from "react";
import SignupContainer from "../components/Setup/SignupContainer";
import ConnectOrganizationContainer from "../components/Setup/ConnectOrganizationContainer";
import { useRecoilValue } from "recoil";
import { loggedInStaffAtom } from "../recoil/staffAtoms";
import { AuthContext } from "../providers/AuthProvider";
import SelectAccountTypeContainer from "../components/Setup/SelectAccountTypeContainer";
import { useNavigate } from "react-router-dom";

type Plan = "individual" | "organization" | null;

function Setup() {
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null);
  const [stage, setStage] = useState("");

  console.log(stage)

  useEffect(() => {
    if (!selectedPlan && !loggedInStaff) {
      setStage("select-plan");
    } else if (
      loggedInStaff &&
      loggedInStaff.accountType === "organization" &&
      loggedInStaff.organizationId === null
    ) {
      setStage("connect-organization");
      setSelectedPlan(loggedInStaff.accountType);
    } else if (selectedPlan && !loggedInStaff) {
      setStage("signup");
    } else {
      setStage("go-to-dashboard");
    }
  }, [loggedInStaff, selectedPlan]);

  useEffect(() => {
    stage === "go-to-dashboard" && navigate("/student-dashboard");
  }, [stage, navigate]);
  return (
    <>
      {!loading && stage === "select-plan" && (
        <SelectAccountTypeContainer setSelectedPlan={setSelectedPlan} />
      )}
      {!loading && stage === "signup" && <SignupContainer selectedPlan={selectedPlan} />}
      {!loading && stage === "connect-organization" && <ConnectOrganizationContainer />}
    </>
  );
}

export default Setup;
