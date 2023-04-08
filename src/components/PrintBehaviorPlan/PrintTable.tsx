import Header from "./Header";
import Footer from "./Footer";
import { BehaviorPlanRecord } from "../../types/types";
import BehaviorPlan from "../BehaviorPlans/BehaviorPlan";

type Props = {
  behaviorPlan: BehaviorPlanRecord;
};

function PrintTable({ behaviorPlan }: Props) {
  return (
    <>
      <Header />
      <Footer />

      <table>
        <thead>
          <tr>
            <td>
              <div className="page-header-space"></div>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <BehaviorPlan selectedBehaviorPlan={behaviorPlan} />
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              <div className="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default PrintTable;
