import { BrowserRouter, Route, Routes } from "react-router-dom"
// import { LoginScreen } from "./screens/auth/login/login-screen";
import MainScreen from "./screens/main/main-screen";

export const AppRoutes = () => {
    return  (
        <BrowserRouter>
            <Routes>
                <Route 
                    index 
                    element={ <MainScreen/> } 
                />
            </Routes>
        </BrowserRouter>
    )
};