
import React from "react";
import MainWindow from "./components/MainWindow";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {
    return(
        <LoginPage />
    );
}

/* <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
                <Route path="new" element={<NewTeamForm />} />
                <Route index element={<LeagueStandings />} />
            </Route>
        </Route>
    </Routes>
</BrowserRouter> */