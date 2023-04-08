import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { studentsObjAtom } from "../../recoil/studentAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";

function Footer() {
  const [footerStatement, setFooterStatement] = useState("");
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const studentsObj = useRecoilValue(studentsObjAtom);
  const organization = useRecoilValue(organizationAtom);

  const today = new Date().toDateString();

  useEffect(() => {
    if (!organization || !studentsObj || !selectedStudentId) return;
    const currentStudent = studentsObj[selectedStudentId];
    document.title = `${organization.name} for ${currentStudent.firstName} ${currentStudent.lastName} printed on ${today}.`;
    setFooterStatement(document.title);
  }, [organization, studentsObj, selectedStudentId, today]);

  return <footer className="page-footer">{footerStatement}</footer>;
}

export default Footer;
