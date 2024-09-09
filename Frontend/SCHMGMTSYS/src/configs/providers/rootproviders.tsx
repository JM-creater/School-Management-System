import { ModalProvider } from "../../components/modal/context/modal-context";
import { AttendanceProvider } from "../../screens/attendance/context/attendance-context";
import { LoginProvider } from "../../screens/auth/login/context/login-context";
import { ClassProvider } from "../../screens/curriculum/class/context/class-context";
import { SubjectProvider } from "../../screens/curriculum/subject/context/subject-context";
import { MenuItemProvider } from "../../screens/main/context/menu-context";
import { ParentProvider } from "../../screens/parents/context/parent-context";
import { StudentProvider } from "../../screens/student/context/student-context";
import { TeacherProvider } from "../../screens/teacher/context/teacher-context";
import { RootProps } from "./props/root-props";

// TODO: To Fix
export const RootProviders: React.FC<RootProps> = ({ children }) => {
    return (
        <MenuItemProvider>
          <ModalProvider>
            <ClassProvider>
              <TeacherProvider>
                <ParentProvider>
                  <SubjectProvider>
                    <StudentProvider>
                      <AttendanceProvider>
                        <LoginProvider>
                          {children}
                        </LoginProvider>
                      </AttendanceProvider>
                    </StudentProvider>
                  </SubjectProvider>
                </ParentProvider>
              </TeacherProvider>
            </ClassProvider>
          </ModalProvider>
        </MenuItemProvider>
    )
};