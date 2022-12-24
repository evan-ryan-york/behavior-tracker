import { Link } from "react-router-dom";
import { loggedInStaffAtom } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

function Weblinks() {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  return (
    <>
      {/* can set permissions here */}
      {loggedInStaff && (
        <>
          <Link className="webLink" to="/staff">
            STAFF
          </Link>
          <Link className="webLink" to="/all-reports">
            ALL REPORTS
          </Link>
          <Link className="webLink" to="/rollups">
            ROLLUPS
          </Link>
        </>
      )}
      <Link className="webLink" to="/form">
        SUBMIT INCIDENT
      </Link>
      <Link className="webLink" to="/user-reports">
        MY REPORTS
      </Link>
    </>
  );
}

export default Weblinks;
