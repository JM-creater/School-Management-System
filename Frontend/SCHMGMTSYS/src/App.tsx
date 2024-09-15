import { 
  AttendanceProvider, 
  ClassProvider, 
  LoginProvider, 
  ParentProvider, 
  StudentProvider, 
  SubjectProvider, 
  TeacherProvider 
} from './screens';
import { 
  rootStore, 
  RootStoreProvider 
} from './stores';
import { ModalProvider } from './components';
import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { toastConfig } from './configs/toast-config'
import { AppRoutes } from './routes'
import { Spinner } from './components/spinner/spinner';
import { MenuItemProvider } from './screens/main/context/menu-context';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <React.Fragment>
      <ToastContainer {...toastConfig} />
      <Suspense fallback={<Spinner/>}>
        <RootStoreProvider value={rootStore}>
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
        </RootStoreProvider>
      </Suspense>
    </React.Fragment>
  );
};