import './App.css'
import React from 'react'
import { RootProviders } from './configs/providers/rootproviders'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainScreen from './screens/main/main-screen'

const App = () => {
  return (
    <React.Fragment>
      <RootProviders>
        <BrowserRouter>
          <Routes>
            <Route index element={ <MainScreen/> } />
          </Routes>
        </BrowserRouter>
      </RootProviders>
    </React.Fragment>
  )
}

export default App