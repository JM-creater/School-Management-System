import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginScreen } from "./screens/auth/login/login";

export const AppRoutes = () => {
    return  (
        <BrowserRouter>
            <Routes>
                <Route index element={ <LoginScreen/> } />
            </Routes>
        </BrowserRouter>
    )
};