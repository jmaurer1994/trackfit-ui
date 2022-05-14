import React, { useState, useEffect, useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { DashboardPage } from "./components/DashboardPage/DashboardPage";
import { ExercisePage } from "./components/ExerciseLogPage/ExercisePage";
import { NutritionMainPage } from "./components/Nutrition/NutritionMainPage";
import { SettingsPage } from "./components/SettingsPage/SettingsPage";
import { NewMeal } from "./components/Nutrition/Meal/NewMeal";
import { UserContext, GoogleContext, AuthButton, GoogleButton, AuthorizedContext, InitializationProvider } from "./components/Providers";
import jwtDecode from "jwt-decode";

export const App = () => {
    const user = useContext(UserContext);

    const [appInitialized, setAppInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false)
    const [authorized, setAuthorized] = useState(false);
    
    useEffect(() =>{
        if(authorized){

            console.log("authorized")
        }
    },[authorized])

    useEffect(() => {
        if (authenticated) {

            console.log("user authenticated")
            console.log(user)
        }
    },[authenticated,user])
    useEffect(() => {
        if (appInitialized) {

            console.log("application initialized")
        }
    },[appInitialized])


    const AppWindow = () => (
        <Box pt={{ base: '8', lg: '12', }} pb={{ base: '12', lg: '24', }} minW="100vw">
            <Outlet />
        </Box>
    )

    const AuthFlow = () => {
        if (authenticated && authorized && appInitialized) {
            return <AuthenticatedPage />
        } else {
            return <LoginPage />
        }
    }

    const LoginPage = () => {
        return (
            <Box>
                <Heading>Test</Heading>
                <GoogleButton />
            </Box>
        )
    }

    const AuthenticatedPage = () => {
        return (
            <BrowserRouter >
                <Navbar />
                <Routes>
                    <Route path="/" element={<AppWindow />}>
                        <Route index element={<DashboardPage />} />

                        <Route path="nutrition" >
                            <Route index element={<NutritionMainPage />} />
                            <Route path="new-meal" element={<NewMeal />} />
                        </Route>

                        <Route path="/exercise-log" element={<ExercisePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    


    return (
        <InitializationProvider authenticated={authenticated} authorized={authorized} appInitialized={appInitialized} setAuthenticated={setAuthenticated} setAuthorized={setAuthorized} setAppInitialized={setAppInitialized}>
            <Box as="section" height="100vh" overflowY="auto" bgColor={useColorModeValue("brand.400", "brand.100")}>
                <AuthFlow />
            </Box>
        </InitializationProvider>
    )
}