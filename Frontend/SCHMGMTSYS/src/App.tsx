import './App.css'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { toastConfig } from './configs/toastConfig'
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './AppRoutes'
import { MenuItemProvider } from './screens/main/context/menu-context';
import { ModalProvider } from './components/modal/context/modal-context';
import { ClassProvider } from './screens/curriculum/class/context/class-context';
import { TeacherProvider } from './screens/teacher/context/teacher-context';
import { ParentProvider } from './screens/parents/context/parent-context';

export const App = () => {
  return (
    <React.Fragment>
      <ToastContainer {...toastConfig} />
        <MenuItemProvider>
            <ModalProvider>
                <ClassProvider>
                    <TeacherProvider>
                        <ParentProvider>
                          <AppRoutes/>
                        </ParentProvider>
                    </TeacherProvider>
                </ClassProvider>
            </ModalProvider>
        </MenuItemProvider>
    </React.Fragment>
  )
}