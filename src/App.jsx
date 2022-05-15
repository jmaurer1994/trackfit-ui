import React, { useState, useEffect, useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Box, Button, Center, Flex, Heading, Spacer, useColorModeValue } from "@chakra-ui/react";
import { DashboardPage } from "./components/DashboardPage/DashboardPage";
import { FitnessPage } from "./components/Fitness/FitnessPage";
import { NutritionMainPage } from "./components/Nutrition/NutritionMainPage";
import { SettingsPage } from "./components/SettingsPage/SettingsPage";
import { NewMeal } from "./components/Nutrition/Meal/NewMeal";
import { UserContext, GoogleContext, AuthButton, GoogleButton, AuthorizedContext, InitializationProvider } from "./components/Providers";
import jwtDecode from "jwt-decode";

export const App = () => {
    const user = useContext(UserContext);

    const AppWindow = () => (
        <Box pt={{ base: '8', lg: '12', }} pb={{ base: '12', lg: '24', }} minW="100vw" >
         
                    <Outlet />

        </Box>
    )

    return (
        <BrowserRouter >
            <Navbar />
            <Routes>
                <Route path="/" element={<AppWindow />}>
                    <Route index element={<DashboardPage />} />

                    <Route path="nutrition" >
                        <Route index element={<NutritionMainPage />} />
                        <Route path="new-meal" element={<NewMeal />} />

                        <Route
                            path="*"
                            element={<Navigate to="/nutrition" replace />}
                        />
                    </Route>

                    <Route path="fitness">
                        <Route index element={<FitnessPage />} />
                        <Route
                            path="*"
                            element={<Navigate to="/fitness" replace />}
                        />
                    </Route>

                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}