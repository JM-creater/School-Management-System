import './App.css'
import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { toastConfig } from './configs/toast-config'
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './routes'
import { Spinner } from './components/spinner/spinner';
// import { RootProviders } from './configs/providers/rootproviders';
import { MenuItemProvider } from './screens/main/context/menu-context';
import { ModalProvider } from './components/modal/context/modal-context';
import { TeacherProvider } from './screens/teacher/context/teacher-context';
import { ParentProvider } from './screens/parents/context/parent-context';
import { SubjectProvider } from './screens/curriculum/subject/context/subject-context';
import { StudentProvider } from './screens/student/context/student-context';
import { AttendanceProvider } from './screens/attendance/context/attendance-context';
import { LoginProvider } from './screens/auth/login/context/login-context';
import { ClassProvider } from './screens/curriculum';

export default function App() {
  return (
    <React.Fragment>
      <ToastContainer {...toastConfig} />
      <Suspense fallback={<Spinner/>}>
        <MenuItemProvider>
          <ModalProvider>
            <ClassProvider>
              <TeacherProvider>
                <ParentProvider>
                  <SubjectProvider>
                    <StudentProvider>
                      <AttendanceProvider>
                        <LoginProvider>
                         <AppRoutes/>
                        </LoginProvider>
                      </AttendanceProvider>
                    </StudentProvider>
                  </SubjectProvider>
                </ParentProvider>
              </TeacherProvider>
            </ClassProvider>
          </ModalProvider>
        </MenuItemProvider>
      </Suspense>
    </React.Fragment>
  );
};