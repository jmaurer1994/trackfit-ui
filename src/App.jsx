
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import {Box, Container, useColorModeValue} from "@chakra-ui/react";
import { DashboardPage } from "./components/DashboardPage/DashboardPage";
import { ExercisePage } from "./components/ExerciseLogPage/ExercisePage";
import { NutritionMainPage } from "./components/Nutrition/NutritionMainPage";
import { SettingsPage } from "./components/SettingsPage/SettingsPage";
import { LogMeal } from "./components/Nutrition/Meal/NewMeal";
export const App = () => (
        <Box as="section" height="100vh" overflowY="auto" bgColor={useColorModeValue("brand.400","brand.100")}>
        
        <BrowserRouter >
        <Navbar />
            <Routes>
                <Route path="/" element={<AppWindow />}>
                    <Route index element={<DashboardPage />} />

                    <Route path="nutrition" >
                        <Route index element={<NutritionMainPage /> }/>
                        <Route path="log-meal" element={<LogMeal />} />

                    </Route>

                    <Route path="/exercise-log" element={<ExercisePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>

        </Box>
    )

const AppWindow = () => (
    <Box pt={{ base: '8', lg: '12',}} pb={{ base: '12', lg: '24',}} minW="100vw">
        <Outlet />
    </Box>
)