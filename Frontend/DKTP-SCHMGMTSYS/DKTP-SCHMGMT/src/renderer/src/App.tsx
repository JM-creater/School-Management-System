import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/main.css'
import { MainScreen } from './screens/main/mainscreen'

export function App(): JSX.Element {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<MainScreen />} />
        </Routes>
    </BrowserRouter>
  )
}
