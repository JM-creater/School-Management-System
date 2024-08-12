import './App.css'
import React from 'react'
import { RootProviders } from './configs/providers/rootproviders'
import { ToastContainer } from 'react-toastify'
import { toastConfig } from './configs/toastConfig'
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './AppRoutes'

export const App = () => {
  return (
    <React.Fragment>
      <ToastContainer {...toastConfig} />
      <RootProviders>
        <AppRoutes/>
      </RootProviders>
    </React.Fragment>
  )
}