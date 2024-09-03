import './App.css'
import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { toastConfig } from './configs/toast-config'
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './routes'
import { Spinner } from './components/spinner/spinner';
import { RootProviders } from './configs/providers/rootproviders';

export default function App() {
  return (
    <React.Fragment>
      <ToastContainer {...toastConfig} />
      <Suspense fallback={<Spinner/>}>
        <RootProviders>
          <AppRoutes/>
        </RootProviders>
      </Suspense>
    </React.Fragment>
  )
};