import { BrowserRouter, Route, Routes } from "react-router-dom"
// import { LoginScreen } from "./screens/auth/login/login-screen";
import { Suspense } from "react";
import { Spinner } from "./components/spinner/spinner";
import { observer } from "mobx-react-lite";
import MainScreen from "./screens/main/main-screen";
  
export const AppRoutes = observer(() => {
    return  (
        <BrowserRouter>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route 
                        index 
                        element={ <MainScreen/> } 
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
});